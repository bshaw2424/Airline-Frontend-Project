import React, { useState, useEffect } from "react";
import { MarkerF } from "@react-google-maps/api";
import {
  changeAirportCodeToIcaoCode,
  axiosCallToLatitudeAndLongitudeCoordinates,
  getUniqueListOfAirportCodes,
} from "../Utilities";
import StateMap from "./StateMap";

export default function StateList({ dataList, searchValue, objectState }) {
  const [getActiveState, setActiveState] = useState(objectState);
  const [coords, setCoords] = useState();
  const [airlineNameList, setAirlineNameList] = useState();
  const [markerData, setMarkerData] = useState();

  useEffect(() => {
    axiosCallToLatitudeAndLongitudeCoordinates(searchValue);
  }, [searchValue]);

  const handleStateClick = airlineName => {
    setActiveState(prevState => ({
      ...Object.fromEntries(
        Object.entries(prevState).map(([key]) => [key, false]),
      ),
      [airlineName]: true,
    }));
    getCoordinatesAndTitleToAddToMap(airlineName);
  };

  const getListOfAirlinesObject = dataList
    .map(state => ({
      // airline name
      name: state.name,
      codes: state.destinations
        .filter(location => location.state === searchValue)
        // get object of ICAO airport codes and corresponding airport name
        .reduce((createObjectOfAirportCodeAndName, items) => {
          createObjectOfAirportCodeAndName.push({
            code: changeAirportCodeToIcaoCode(items.airport_code),
            airport: items.airport_name,
          });
          return createObjectOfAirportCodeAndName;
        }, []),
      // length of destinations within the targeted state search (ex... Arizona)
      length: state.destinations
        .filter(
          location =>
            location.state === searchValue &&
            location.international === "false",
        )
        .map(location => location.airport_code).length,
    }))
    .filter(listItem => listItem.codes.length !== 0);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const getListOfAirlinesObject = dataList
          .map(state => ({
            // airline name
            name: state.name,
            codes: state.destinations
              .filter(location => location.state === searchValue)
              // get object of ICAO airport codes and corresponding airport name
              .reduce((createObjectOfAirportCodeAndName, items) => {
                createObjectOfAirportCodeAndName.push({
                  code: changeAirportCodeToIcaoCode(items.airport_code),
                  airport: items.airport_name,
                });
                return createObjectOfAirportCodeAndName;
              }, []),
            // length of destinations within the targeted state search (ex... Arizona)
            length: state.destinations
              .filter(
                location =>
                  location.state === searchValue &&
                  location.international === "false",
              )
              .map(location => location.airport_code).length,
          }))
          .filter(listItem => listItem.codes.length !== 0);

        const dataResultsObjectWithNameAndCoordinates = await Promise.all(
          getUniqueListOfAirportCodes(getListOfAirlinesObject).map(
            async locationNameAndCoordinates => {
              const getLatitudeLongitudeCoordinatesFromAPI =
                await axiosCallToLatitudeAndLongitudeCoordinates(
                  locationNameAndCoordinates,
                );

              return {
                name: locationNameAndCoordinates,
                coordinates: getLatitudeLongitudeCoordinatesFromAPI,
              };
            },
          ),
        );

        // puts the lat and lng coordinates in a object
        const compareListToFindMatchingCodes = getListOfAirlinesObject.map(
          coords =>
            coords.codes.map(matchingName => {
              const findMatchingName =
                dataResultsObjectWithNameAndCoordinates.find(
                  object => object.name === matchingName.code,
                );
              return findMatchingName
                ? {
                    location: findMatchingName.coordinates,
                    title: matchingName.airport,
                  }
                : matchingName;
            }),
        );

        const getListOfAirlineNames = getListOfAirlinesObject.map(a => a.name);
        setAirlineNameList(getListOfAirlineNames);

        setCoords(compareListToFindMatchingCodes);
      } catch (error) {
        console.log("there was a error " + error);
      }
    };
    getCoordinates();
  }, [dataList, searchValue]);

  const getCoordinatesAndTitleToAddToMap = airlineName => {
    const indexOfClickedAirlineName = airlineNameList.findIndex(
      name => name === airlineName,
    );
    const getMapPositionCoordinates = coords[indexOfClickedAirlineName].map(
      a => {
        const {
          location: { lat, lng },
          title,
        } = a;
        return { lat: +lat, lng: +lng, title };
      },
    );
    return setMarkerData(getMapPositionCoordinates);
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        fontSize: "1.2rem",
        display: "flex",
      }}
    >
      <ul style={{ listStyle: "none" }}>
        {getListOfAirlinesObject.map((airline, index) => (
          <li
            key={`${airline.name}-${index}`}
            className={`ps-4 py-1 me-5 ${
              getActiveState[airline.name] ? "active" : ""
            }`}
            onClick={() => handleStateClick(airline.name)}
          >
            {airline.name} - {airline.length} *
          </li>
        ))}
      </ul>
      <StateMap displayMap={dataList} centerPointOfMap={searchValue}>
        <MarkerF position={{ ...markerData }} />
      </StateMap>
    </div>
  );
}
