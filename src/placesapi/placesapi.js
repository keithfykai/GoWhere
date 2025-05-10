/*  Functions of Google Places API:
1. Provide place search results from different types of users queries, such as text input, nearby locations, and ambiguous or categorical user queries.
2. Add high-quality photos to locations served by your application.
3. Refine the type of details returned about a place, such as operating hours, a summary, user reviews, and a photo.

Many Google Maps Platform APIs support place IDs, where the place ID uniquely identifies a place in the Google Places database and on Google Maps.
There are many ways to obtain a place ID, including from the Places API, but also from the Geocoding API, Routes API, and Address Validation API.

Layman Terms: Using the place ID, we can get the details of a place, such as the name, address, and phone number. 
We can also get the place's location, opening hours, and photos from the Google Places API.

Using the new Places API:

1. Place Details
A place ID uniquely identifies a place in the Google Places database and on Google Maps. 
With a place ID, you can request details about a particular establishment or point of interest by initiating a Place Details (New) request. 
A Place Details (New) request returns comprehensive information about the indicated place such as its complete address, phone number, user rating, and reviews.

There are many ways to obtain a place ID. You can use:

Text Search (New) - returns information about a set of places based on a string — for example "pizza in New York" or "shoe stores near Ottawa" or "123 Main Street".
The service responds with a list of places matching the text string and any location bias that has been set.
Nearby Search (New)
Geocoding API
Routes API
Address Validation API
Place Autocomplete

2. Place Photo
3. Nearby Search
4. Text Search
5. Autocomplete

*/

const APIKey = 'AIzaSyD6SxOy-s8d409wFjZEjjE_UKZRFBK6-VM';

export default APIKey;