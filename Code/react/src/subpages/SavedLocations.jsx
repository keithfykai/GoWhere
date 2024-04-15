import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFirestore, doc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { auth } from '../firebase/firebase';
import handleStars from '../mapbox/mapfunctionality/handleRatings';
import { onAuthStateChanged } from "firebase/auth";
import searchById from '../placesapi/searchbyid.js';
import APIKey from '../placesapi/placesapi.js';
import { getPlacePhoto } from './MapPage.jsx';

function Location_row({ locations, onUnsaveLocation }) {
    return (
        <div>
        {locations.map((location, index) => (
            <div key={index}>
            {/* Location element */}
            <div className='bg-gray-200 rounded-lg overflow-hidden shadow-md relative flex'>
                <img src={location.photoUrl} className='w-64 h-32 sm:h-48 object-cover' alt="Location"></img>
                <div className='py-6 m-4 justify-center'>
                <span className='px-6 py-6 font-bold text-xl'>{location.name}</span>
                <span className='px-6 py-4 block text-gray-500'>{location.address}</span>
                <span className='px-6 block text-gray-500'>{"Rating: "+ location.rating + " / 5 " + handleStars(location.rating)}</span>
                </div>
                <button 
                    className='mr-8 border-slate-500 border-2 bg-white text-slate-500 text-xs uppercase font-bold rounded-full p-2 absolute top-14 right-5 mt-5 hover:bg-slate-500 hover:text-white'
                    onClick={() => onUnsaveLocation(location.placeId)} // Pass place ID to the callback
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
                </svg>
                </button>
            </div>
            {/* Additional content */}
            <div className='py-3'></div>
            </div>
        ))}
        </div>
    );
}

export const SavedLocations = () => {
    const db = getFirestore();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    let userEmail = null;
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userEmail = user.email;
        } else {
            // User is signed out
            navigate("/");
        }
    });

    useEffect(() => {
        async function fetchData() {
            const colRef = collection(db, 'saved_locations');
            try {
                const snapshot = await getDocs(colRef);
                let newData = [];
    
                for (const doc of snapshot.docs) {
                    if (doc.id === userEmail) {
                        const subCollectionRef = collection(doc.ref, 'places');
                        const subCollectionSnapshot = await getDocs(subCollectionRef);
    
                        // Create an array of promises
                        const promises = subCollectionSnapshot.docs.map(async subDoc => {
                            const subDocData = subDoc.data();
                            let placeId = subDoc.id;
                            let placeId1 = 'places/' + placeId;
                            const data = await searchById(placeId1);
                            if (data) {
                                console.log('Place Data: ', data)
                                console.log('Place Photo Name: ', data.photos[0].name);
                                const photoObject = await getPlacePhoto(data.photos[0].name, APIKey);
                                if (photoObject) {
                                    console.log('Photo Uri: ', photoObject.photoUri);
                                    const photolink = photoObject.photoUri;
                                    console.log('Photo Link: ', photolink);
                                    newData.push({ ...subDocData, placeId, photoUrl: photolink });
                                }
                            }
                        });
    
                        // Wait for all promises to resolve before setting data
                        await Promise.all(promises);
                        break;
                    }
                }
                setData(newData);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching documents: ', error);
            }
        }
        fetchData();
    }, []);

    const handleUnsaveLocation = async (placeId) => {
        // Unsave location using placeId
        console.log('delete');
        const userDocRef = doc(db, "saved_locations", userEmail);
        const placesCollectionRef = collection(userDocRef, 'places');
        await deleteDoc(doc(placesCollectionRef, placeId));
        console.log('Unsaving location with place ID:', placeId);

        // Refresh the page
        window.location.reload();
    };

    return (
        <div className='mt-14 mb-24 max-w-[900px] w-full mx-auto flex flex-col justify-center'>
        <h1 className='mt-[-24px] mb-3 ml-1 py-6 md:text-4xl font-bold text-black-500'>
            Saved Locations 
        </h1>
        {loading ? (<div>Loading...</div>) : (<Location_row locations={data} onUnsaveLocation={handleUnsaveLocation}/>)}
        <div className='next'>
            <Link to='/accountdetails'><button className='bg-red-500 rounded-full font-medium mt-6 px-8 py-3 text-white'>Return to Account Details</button></Link>
        </div>
        </div>
    );
}