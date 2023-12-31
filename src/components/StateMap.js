import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { stateAndCountryCoordinates } from "./StateCountryArrays";
import axios from "axios";
import { useEffect, useState } from "react";

// import axios from "axios";

export default function StateMap({ displayMap, centerPointOfMap }) {
  const [coordinates, setCoordinates] = useState({});
  const [stateLocation, setStateLocation] = useState();
  const [main, setMain] = useState();
  const apiKey = "YD07ub+l4kuNqmk2vsP5vg==i0tJXQxsPIm8k20l";

  const getCoordinates = async airportCode => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/airports?iata=${airportCode}`,
        {
          headers: { "X-Api-Key": apiKey },
        },
      );
      const { latitude, longitude } = await response.data;
      return { lat: latitude, lng: longitude };
    } catch (error) {
      console.error(`Error fetching coordinates for ${airportCode}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const filteredCoordinates = stateAndCountryCoordinates.filter(
      destination => destination.name === centerPointOfMap,
    );

    if (filteredCoordinates.length > 0) {
      const { lat, lng } = filteredCoordinates[0];
      setCoordinates({ lat, lng });
    }
  }, [centerPointOfMap]);

  // **** start here ***
  //get array of airport codes based from state search input

  useEffect(() => {
    const getItems = async () => {
      try {
        const arrayOfAirportCodes = displayMap.map(item =>
          item.destinations
            .filter(destination => destination.state === centerPointOfMap)
            .map(destination => destination.airport_code),
        );
        const getMain = arrayOfAirportCodes.flatMap(codes => {
          return codes.map(coords => coords);
        });
        const great = [...new Set(getMain)];
        const coordinates = arrayOfAirportCodes.map(code => {
          return code.map(coord => coord);
        });

        const results = great.map(a => ({
          name: a,
          coords: `https://api.api-ninjas.com/v1/airports?iata=${a}`,
        }));
        setMain(results);
        setStateLocation(coordinates);
      } catch (error) {
        console.log("there was a error " + error);
      }
    };

    getItems();
  }, [displayMap, centerPointOfMap]);

  const centerOfMapCoordinates = coordinates;

  const sizeOfMapDisplayContainer = {
    width: "970px",
    height: "550px",
  };

  const api_key = process.env.REACT_APP_API_KEY;

  // if map is loaded
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: api_key,
  });

  return isLoaded ? (
    <div
      style={{
        maxWidth: "100%",
        height: "100%",
      }}
    >
      <div style={{ outline: "1px solid blue", padding: "1rem " }}>
        {stateLocation
          .filter(a => a.length > 0)
          .map(a => (
            <div
              style={{
                outline: "2px solid red",
                padding: "1rem",
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {a}
            </div>
          ))}
      </div>
      {main.map(a => (
        <div>
          {a.name} - {a.coords}
        </div>
      ))}
      <GoogleMap
        mapContainerStyle={sizeOfMapDisplayContainer}
        center={centerOfMapCoordinates}
        zoom={6}
        options={{
          zoomControl: false,
          streetView: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      ></GoogleMap>
    </div>
  ) : (
    <>...loading</>
  );
}
