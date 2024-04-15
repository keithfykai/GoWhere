async function get4DayWeatherForecast() {
  const weather_api = new URL('https://api.data.gov.sg/v1/environment/4-day-weather-forecast')

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  return fetch(weather_api, options)
    .then((response) => response.json())
    .then((data) => {
      // Process the response data here, containing the list of nearby places
      return data;
    })
    .catch((error) => console.error('Error fetching weather:', error));

}

async function get2HrWeatherForecast() {
  const weather_api = new URL('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')

  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };

  return fetch(weather_api, options)
    .then((response) => response.json())
    .then((data) => {
      // Process the response data here, containing the list of nearby places
      return data;
    })
    .catch((error) => console.error('Error fetching weather:', error));

}

export { get2HrWeatherForecast, get4DayWeatherForecast};