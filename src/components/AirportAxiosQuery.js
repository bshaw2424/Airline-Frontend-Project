import axios from "axios";

export const axiosCallToLatitudeAndLongitudeCoordinates = async (
  type,
  airportCode,
) => {
  const apiNinja_api_key = process.env.REACT_APP_AXIOS_API_KEY;
  // converts into their original characters
  const key = decodeURIComponent(apiNinja_api_key);

  try {
    const url = `https://api.api-ninjas.com/v1/airports?${type}=${airportCode}`;

    // axios call with the url
    const response = await axios.get(url, {
      headers: { "X-Api-Key": key },
    });

    // axios response data
    const airportData = response.data[0];

    if (airportData) {
      const { latitude, longitude } = airportData;
      return { lat: latitude, lng: longitude };
    }
  } catch (error) {
    console.error(`Error fetching coordinates for ${airportCode}:`, error);
    return null;
  }
};
