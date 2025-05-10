import React, { useState, useEffect , useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import '../mapbox/mapbox.css';
import { get2HrWeatherForecast, get4DayWeatherForecast } from '../govapi/weatherforecastapi';
import handleStars from '../mapbox/mapfunctionality/handleRatings.js';
import ReviewCard from '../mapbox/mapfunctionality/ReviewCard.jsx';
import { answers } from './Questionnaire.jsx';
import { getFirestore } from "firebase/firestore"; 
import { doc, collection, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { getNearbyPlaces, getPlaceId } from '../placesapi/nearbysearch.js';
import { auth , useAuth } from '../firebase/firebase';
import { onAuthStateChanged } from "firebase/auth";
import APIKey from '../placesapi/placesapi.js';

/* Singapore Coordinates:
    Longitude: 103.7975 | Latitude: 1.3116 | Zoom: 11.05

    Using the coordinates, we plug it into Google Maps to get the exact location in Singapore to retreive Google Places API data.
  */
const defaultCoordinates = [103.7975, 1.3116];
mapboxgl.accessToken = 'pk.eyJ1Ijoia2VpdGhmeWthaSIsImEiOiJjbHMxZzdvcXEwOWQ1MmtvM2k1em5iNGUwIn0.dx6kqRegmyg7BwxWTga0wQ';

export async function getPlacePhoto(photoReference, apiKey) {
    const url = `https://places.googleapis.com/v1/${photoReference}/media?key=${apiKey}&maxHeightPx=500&maxWidthPx=500&skipHttpRedirect=true`;

    return fetch(url)
    .then((response) => response.json())
    .then((data) => {
        // Process the place information (id, name, and potentially other retrieved fields)
        console.log(data.photoUri);
        return data;
    })
    .catch((error) => {return('Error fetching place details:', error)});
}

export async function getCurrentTemperature() {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather?lat=1.31&lon=103.79&appid=8f1cce755aed56295294d3b0a3a43a19');

    try {
        const response = await fetch(url);
        const data = await response.json();
        const temperatureInKelvin = data.main.temp;
        const temperatureInCelsius = temperatureInKelvin - 273.15;
        console.log('Temperature in Celsius:', temperatureInCelsius);
        return Math.round(temperatureInCelsius); // Round the temperature to an integer
    } catch (error) {
        console.error('Error fetching current temperature:', error);
        return null; // Return null or handle the error as needed
    }
}


export const MapPage = () => {
    const [lng, setLng] = useState(defaultCoordinates[0]);
    const [lat, setLat] = useState(defaultCoordinates[1]);
    const [locationReady, setLocationReady] = useState(false);
    const [googleMapsLink, setGoogleMapsLink] = useState(null);
    const [ratingCount, setRatingCount] = useState(0);
    const [currentTemp, setCurrentTemp] = useState(0);

    useEffect(() => {
        const temp = getCurrentTemperature();
        temp.then((data) => {
            if (data) {
                console.log('temp: ', data);
                setCurrentTemp(data);
            }
        }).catch((error) => {
            console.error('Error fetching temp:', error);
        });

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        };
        
        function success(pos) {
            const crd = pos.coords;
            
            setLat(crd.latitude);
            setLng(crd.longitude);
            setLocationReady(true); // Indicate that location data is ready
        }
        
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
        window.scrollTo(0, 0);
    }, []); // Empty dependency array ensures this effect runs only once

    // Check if location data is ready before continuing
    useEffect(() => {
        if (locationReady) {
            // Code that depends on lat and lng being set
            console.log("Current Latitude:", lat, "Current Longitude:", lng);
        }
    }, [locationReady, lat, lng]); // Run effect when locationReady, lat, or lng changes

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(11.7);

    const initialState = {
        name: '',
        profilePhoto: '',
        rating: '',
        review: '',
        time: '',
    };

    const initialOpeningHoursState = {
        openNow: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: '',
    };

    const db = getFirestore();
    const currentUser = useAuth();
    const [email , setEmail] = useState(null);
    const [name, setName] = useState('Name');
    const [rating, setRating] = useState('Rating');
    const [address, setAddress] = useState('Address');
    const [regularOpeningHours, setRegularOpeningHours] = useState(initialOpeningHoursState);
    const [weather, setWeather] = useState('Weather');
    const [stars, setStars] = useState('');
    const [reminder, setReminder] = useState('');
    const [reviewsArray, setReviewsArray] = useState([]);
    const [review1, setReview1] = useState(initialState);
    const [review2, setReview2] = useState(initialState);
    const [review3, setReview3] = useState(initialState);
    const [review4, setReview4] = useState(initialState);
    const [review5, setReview5] = useState(initialState);
    const [isBookmark, setBookmark] = useState(false);
    const [placeFound, setPlaceFound] = useState(false); // State variable to track if a place is found
    const [mapLoaded, setMapLoaded] = useState(false); // State variable to track map loading
    const [photo, setPhoto] = useState('');
    const [toggleMoreReviews, setToggleMoreReviews] = useState(false);

    function handleRegularOpeningHours(openinghours) {
        setRegularOpeningHours({
            openNow: openinghours.openNow ? 'Open Now' : 'Closed',
            monday: openinghours.weekdayDescriptions[0],
            tuesday: openinghours.weekdayDescriptions[1],
            wednesday: openinghours.weekdayDescriptions[2],
            thursday: openinghours.weekdayDescriptions[3],
            friday: openinghours.weekdayDescriptions[4],
            saturday: openinghours.weekdayDescriptions[5],
            sunday: openinghours.weekdayDescriptions[6],
        });
    }

    function handleReviewChange1(review) {
        setReview1({
            profilePhoto: review.authorAttribution.photoUri,
            name: review.authorAttribution.displayName,
            rating: review.rating,
            review: review.text.text,
            time: review.publishTime,
        });
    }

    function addMarker(longitude, latitude, map) {
        const marker = new mapboxgl.Marker({
          color: '#FF0000',
        })
        .setLngLat([longitude, latitude])
        .addTo(map);
    }

    useEffect(() => {
        if (locationReady) {
            if (map.current) {
                setMapLoaded(true);
                return; // Initialize map only once
            }

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            });
    
            // **Add the NavigationControl here:**
            map.current.addControl(new mapboxgl.NavigationControl());
            map.current.addControl(new mapboxgl.FullscreenControl());
            map.current.addControl(new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            }));
    
            map.current.on('move', () => {
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
        }
    }, [locationReady, lng, lat, zoom]); // Run effect when locationReady, lng, lat, or zoom changes    

    useEffect(() => {
        if (locationReady && !mapLoaded) {
            if (!placeFound) { // Check if a place has not been found yet
                const places_promise = getNearbyPlaces(lng, lat, answers.distance, answers.exclusion, 20);
                places_promise.then((data) => {
                    if (data) { // Check if data is received
                        console.log("Places found:", data.location.latitude, data.location.longitude);
                        // adds the marker of the location of the map
                        addMarker(data.location.longitude, data.location.latitude, map.current);
                        setPlaceFound(true); // Update state to indicate a place has been found
                        setName(data.displayName.text);
                        setStars(handleStars(data.rating));
                        setRating(data.rating);
                        setAddress(data.formattedAddress);
                        setReviewsArray(data.reviews);
                        handleReviewChange1(data.reviews[0]);
                        handleRegularOpeningHours(data.regularOpeningHours);
                        setGoogleMapsLink(data.googleMapsUri);
                        setRatingCount(data.userRatingCount);
                        setMoreReviews(data.reviews);

                        const photoObject = getPlacePhoto(data.photos[0].name, APIKey);
                        photoObject.then((data2) => {
                            if (data2) {
                                console.log('Photo Uri: ', data2.photoUri);
                                const photolink = data2.photoUri;
                                console.log('Photo Link: ', photolink);
                                setPhoto(photolink); // Update the state with the fetched photo URL
                            }
                        }).catch((error) => {
                            console.error('Error fetching place photo:', error);
                        });

                        console.log('Place Data: ', data)
                        console.log('Place Photo Name: ', data.photos[0].name)
                    } else {
                        // Handle case where no data is received
                        console.log("No places found");
                    }
                }).catch((error) => {
                    // Handle errors
                    console.error("Error fetching nearby places:", error);
                });
            }
        }
    }, [locationReady, mapLoaded, placeFound]); // Run effect when locationReady, mapLoaded, or placeFound state changes    

    const weather2hr = get2HrWeatherForecast();
    weather2hr.then((data) => {
        const west6to12 = data.items[0].forecasts[0].forecast;
        if (west6to12 === 'Raining' || west6to12 === 'Showers') {
            setReminder('Please bring an umbrella.');
        }
        setWeather(west6to12);
    });

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
            setEmail(user.email)
            } else {
            // User is signed out
            navigate("/");
            }
        });
    }, [currentUser])

    const toggleBookmark = async (email) => {
        const newBookmarkState = !isBookmark;
        setBookmark(newBookmarkState);
        let place_id = getPlaceId();
        console.log('place id: ', place_id);
        console.log(email);

        if (place_id != null) {
            const userDocRef = doc(db, "saved_locations", email);

            // create new doc with email if not created
            const docSnapshot = await getDoc(userDocRef);
            if (!docSnapshot.exists()) {
                await setDoc(userDocRef, {});
            }
    
            const placesCollectionRef = collection(userDocRef, 'places');

            // save place into 'places' collection using place_id as the document id
            if (newBookmarkState) {
                console.log('save');
                const docData = {
                    address: address,
                    name: name,
                    rating: rating
                };
                await setDoc(doc(placesCollectionRef, place_id), docData);

            // unsave place from collection
            } else {
                console.log('unsave');
                await deleteDoc(doc(placesCollectionRef, place_id));
            }
        }
      };
    
      function randomiseSearch() {
        window.scrollTo(0, 0);
        setPhoto(null);
        setReviewsArray([]);
        setToggleMoreReviews(false);
        setBookmark(false);
        const places_promise = getNearbyPlaces(lng, lat, answers.distance, answers.exclusion, 20);
                places_promise.then((data) => {
                    if (data) { // Check if data is received
                        console.log("Places found:", data.location.latitude, data.location.longitude);
                        // adds the marker of the location of the map
                        addMarker(data.location.longitude, data.location.latitude, map.current);
                        setPlaceFound(true); // Update state to indicate a place has been found
                        setName(data.displayName.text);
                        setStars(handleStars(data.rating));
                        setRating(data.rating);
                        setAddress(data.formattedAddress);
                        setReviewsArray(data.reviews);
                        handleReviewChange1(data.reviews[0]);
                        handleRegularOpeningHours(data.regularOpeningHours);
                        setGoogleMapsLink(data.googleMapsUri);
                        setRatingCount(data.userRatingCount);
                        setMoreReviews(data.reviews);

                        const photoObject = getPlacePhoto(data.photos[0].name, APIKey);
                        photoObject.then((data2) => {
                            if (data2) {
                                console.log('Photo Uri: ', data2.photoUri);
                                const photolink = data2.photoUri;
                                console.log('Photo Link: ', photolink);
                                setPhoto(photolink); // Update the state with the fetched photo URL
                            }
                        }).catch((error) => {
                            console.error('Error fetching place photo:', error);
                        });

                        console.log('Place Data: ', data)
                        console.log('Place Photo Name: ', data.photos[0].name)
                    } else {
                        // Handle case where no data is received
                        console.log("No places found");
                    }
                }).catch((error) => {
                    // Handle errors
                    console.error("Error fetching nearby places:", error);
                    alert("No suitable places found. Please try another search.");
                }, [locationReady, mapLoaded, placeFound]); // Run effect when locationReady, mapLoaded, or placeFound state changes
      }

      function setMoreReviews(reviews){
            setReview2({
                profilePhoto: reviews[1].authorAttribution.photoUri,
                name: reviews[1].authorAttribution.displayName,
                rating: reviews[1].rating,
                review: reviews[1].text.text,
                time: reviews[1].publishTime,
            });
            setReview3({
                profilePhoto: reviews[2].authorAttribution.photoUri,
                name: reviews[2].authorAttribution.displayName,
                rating: reviews[2].rating,
                review: reviews[2].text.text,
                time: reviews[2].publishTime,
            });
            setReview4({
                profilePhoto: reviews[3].authorAttribution.photoUri,
                name: reviews[3].authorAttribution.displayName,
                rating: reviews[3].rating,
                review: reviews[3].text.text,
                time: reviews[3].publishTime,
            });
            setReview5({
                profilePhoto: reviews[4].authorAttribution.photoUri,
                name: reviews[4].authorAttribution.displayName,
                rating: reviews[4].rating,
                review: reviews[4].text.text,
                time: reviews[4].publishTime,
            });
      }

      function handleMoreReviews(){
        setToggleMoreReviews(!toggleMoreReviews);
      }

      function googLink(){
        window.open(googleMapsLink, '_blank');
      }
    
    return (
        <div className="grid justify-items-center sm:mx-16 mx-6 mt-8">
            <div className=" xl:max-w-[1280px] w-full grid grid-cols-12 h-[550px]">
                <div className="col-span-3 overflow-auto pr-3">
                    <div>
                        <div>
                            {photo && <img src={photo} className='max-h-44 w-full object-cover'></img>}
                        </div>
                        <div className="flex flex-row place-content-between">
                            <h1 className="text-2xl pt-4 justify-content align-items font-bold">{name}</h1>
                            <div>
                                <button
                                    onClick={() => toggleBookmark(email)}
                                    className={`ml-2 border-2 rounded-full mt-4 p-1 hover:bg-slate-500 hover:text-white ${isBookmark ? 'bg-slate-500 text-white' : 'bg-white text-slate-500'}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <h2 className="text-sm pb-3">
                            {rating} {stars} ({ratingCount})
                        </h2>

                        <h2 className=" font-bold mt-3 mb-[1px]">Address:</h2>
                        <h2 className="">{address}</h2>
                        {googleMapsLink != null ? <a className="cursor-default hover:underline text-sm text-blue-500" onClick={googLink} >Link to Google Maps</a> : null}

                        <div className="mt-6">
                            <h2 className="font-bold mb-1">
                                <span>Opening Hours: </span>
                                Currently {regularOpeningHours.openNow}
                            </h2>
                            <h2 className="mb-[1px]">{regularOpeningHours.tuesday}</h2>
                            <h2 className="mb-[1px]">{regularOpeningHours.wednesday}</h2>
                            <h2 className="mb-[1px]">{regularOpeningHours.thursday}</h2>
                            <h2 className="mb-[1px]">{regularOpeningHours.friday}</h2>
                            <h2 className="mb-[1px]">{regularOpeningHours.saturday}</h2>
                            <h2 className="mb-[1px]">{regularOpeningHours.sunday}</h2>
                            <h2 className="mb-[1px]">{regularOpeningHours.monday}</h2>
                        </div>

                        <div>
                            <h2 className="font-bold mt-6">Reviews: </h2>
                            <ReviewCard
                                name={review1.name}
                                profilePhoto={review1.profilePhoto}
                                rating={review1.rating}
                                review={review1.review}
                                time={review1.time}
                            />
                            {toggleMoreReviews && reviewsArray.length > 4 && (
                                <>
                                    <ReviewCard 
                                        name={review2.name}
                                        profilePhoto={review2.profilePhoto}
                                        rating={review2.rating}
                                        review={review2.review}
                                        time={review2.time}
                                    />
                                    <ReviewCard 
                                        name={review3.name}
                                        profilePhoto={review3.profilePhoto}
                                        rating={review3.rating}
                                        review={review3.review}
                                        time={review3.time}
                                    />
                                    <ReviewCard 
                                        name={review4.name}
                                        profilePhoto={review4.profilePhoto}
                                        rating={review4.rating}
                                        review={review4.review}
                                        time={review4.time}
                                    />
                                    <ReviewCard 
                                        name={review5.name}
                                        profilePhoto={review5.profilePhoto}
                                        rating={review5.rating}
                                        review={review5.review}
                                        time={review5.time}
                                    />
                                </>
                            )}
                        </div>

                        {reviewsArray.length > 4 && (
                            <button onClick={handleMoreReviews} className="bg-yellow-200 rounded-full py-3 px-8">
                                {toggleMoreReviews ? 'Hide Reviews' : 'More Reviews'}
                            </button>
                        )}
                        
                        <h2 className="mt-8 ml-2">Current Weather: {currentTemp} Degrees Celcius,  {weather}</h2>
             
                        <h2 className="text-black-500 pb-3">{reminder}</h2>
                    </div>
                    <div className="text-center mt-20 bg-gray-200 rounded-3xl py-6">
                        <h2 className="font-bold">Fancy Somewhere Else?</h2>
                        <button onClick={randomiseSearch} className="bg-red-500 rounded-full mt-3 py-3 pl-8 pr-6 text-white">
                            I'm Feeling Lucky ✨
                        </button>
                    </div>
                </div>

                <div className="col-span-9">
                    <div ref={mapContainer} className="map-container" />
                </div>
            </div>
        </div>

    );
};
