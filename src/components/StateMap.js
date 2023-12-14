import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { stateAndCountryCoordinates } from "./StateCountryArrays";
import { useEffect, useState } from "react";

// import axios from "axios";

export default function StateMap({ centerPointOfMap }) {
  const [coordinates, setCoordinates] = useState({});

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
  // get array of airport codes based from state search input
  // const [stateLocation, setStateLocation] = useState()
  // useEffect(
  //   () =>
  //     async function getItems() {
  //       const arr = [];
  //       const filterToGetAirportName = displayMap.map(a =>
  //         a.destinations
  //           .filter(a => a.state === centerPointOfMap)
  //           .map(a => a.airport_code),
  //       );

  //       for (const arrayOfAirportCodes of filterToGetAirportName) {
  //         const first = arrayOfAirportCodes.map(a =>
  //           axios.get(`https://api.api-ninjas.com/v1/airports?iata=${a}`, {
  //             headers: {
  //               "X-Api-Key": process.ENV.STATE_DATA_KEY,
  //             },
  //             contentType: "application/json",
  //           }),
  //         );
  //         const responses = await axios.all(first);
  //         arr.push(responses);
  //       }

  //       getItems();
  //     },
  //   [displayMap, centerPointOfMap],
  // );

  // async function getAirportCodeToDisplayMarker() {
  //   const response = await axios.get(
  //     `https://api.api-ninjas.com/v1/airports?iata=${filterToGetAirportName[0]}`,
  //     {
  //       headers: { "X-Api-Key": process.ENV.STATE_DATA_KEY },
  //       contentType: "application/json",
  //     },
  //   );
  //   const data = response.data[0];
  //   console.log(data);
  // }
  // console.log(getAirportCodeToDisplayMarker());

  // get the center point of State/Country

  // const { lat, lng } = filteredCoordinates[0];
  // console.log({ lat, lng });
  const centerOFMapCoordinates = coordinates;

  const sizeOfMapDisplayContainer = {
    width: "970px",
    height: "550px",
  };

  const api_key = process.env.REACT_APP_API_KEY;
  console.log("key " + api_key);

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
      <GoogleMap
        mapContainerStyle={sizeOfMapDisplayContainer}
        center={centerOFMapCoordinates}
        zoom={6}
        options={{
          zoomControl: false,
          streetView: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        <Marker />
      </GoogleMap>
    </div>
  ) : (
    <>...loading</>
  );
}
