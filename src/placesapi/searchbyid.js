/* Possible Fields for use: (Use Exact Name from the API Response to Retrieve the Data)
    1. displayName
    2. formattedAddress
    3. nationalPhoneNumber
    4. types
    5. location
    6. viewport
    7. rating
    8. googleMapsUri
    9. userRatingCount
    10. websiteUri
    11. regularOpeningHours
    12. priceLevel
    13. primaryTypeDisplayName
    14. reviews
    15. photos
    16. goodForChildren
    17. goodForGroups
    18. accessibilityOptions
*/
import APIKey from "./placesapi.js";

async function searchById(place_id) {
    const url = new URL(`https://places.googleapis.com/v1/${place_id}`);

    const options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': APIKey,
        'X-Goog-FieldMask': '*', // Fields to retrieve (change to '*' to see all)
        'Accept-Language': 'en', // Add the language code here
    },
    };

    return fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
        // Process the place information (id, name, and potentially other retrieved fields)
        return data;
    })
    .catch((error) => {return('Error fetching place details:', error)});
}

export default searchById;