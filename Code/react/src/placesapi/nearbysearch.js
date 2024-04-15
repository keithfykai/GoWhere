import APIKey from './placesapi.js';
import searchById from './searchbyid.js';

let place_id = null;

async function getNearbyPlaces(longitude, latitude, radius, includedTypes, maxResults) {
  const fields = ['places.name']; // Fields to retrieve (limited to name in this example)

  const url = new URL('https://places.googleapis.com/v1/places:searchNearby');

  const data = {
    includedTypes,
    maxResultCount: maxResults,
    locationRestriction: {
      circle: {
        center: {
          latitude,
          longitude,
        },
        radius,
      },
    },
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': APIKey,
      'X-Goog-FieldMask': fields.join(','), // Join fields into a comma-separated string
      'Accept-Language': 'en', // Add the language code here
    },
    body: JSON.stringify(data),
  };

  return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      // Process the response data here, containing the list of nearby places

      // Get a random index from the places array
      const randomIndex = getRandomIndex(data.places);
      const randomPlace = data.places[randomIndex];

      let place1 = randomPlace.name;
      let parts = place1.split("/");
      place_id = parts[1];
      return searchById(place1);
    })
    .catch((error) => console.error('Error fetching places:', error));
}

// Function to get a random index within the range of the array size
function getRandomIndex(array) {
  const randomNumber = Math.random();
  const randomIndex = Math.floor(randomNumber * array.length);
  return randomIndex;
}

// Function to obtain the latest version of place_id as a global variable
function getPlaceId() {
  return place_id;
}

export { getNearbyPlaces, getPlaceId };
