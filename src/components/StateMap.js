import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { stateAndCountryCoordinates } from "./StateCountryArrays";
import axios from "axios";
import { useEffect, useState } from "react";

// import axios from "axios";

export default function StateMap({ displayMap, centerPointOfMap }) {
  const [coordinates, setCoordinates] = useState({});
  const [stateLocation, setStateLocation] = useState();

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
        const arrayOfAirportCodes = displayMap.flatMap(item =>
          item.destinations
            .filter(destination => destination.state === centerPointOfMap)
            .map(destination => destination.airport_code),
        );

        const urls = arrayOfAirportCodes.map(
          code => `https://api.api-ninjas.com/v1/airports?iata=${code}`,
        );

        console.log(urls);

        // Do something with the URLs if needed

        // setStateLocation(arrayOfAirportCodes);
      } catch (error) {
        console.log(error);
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
      {stateLocation.map(state => state.lat)}
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
