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
    console.log(coords.map(a => a.map(a => a))[2]);
    console.log(getActiveState);
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
        console.log(dataResultsObjectWithNameAndCoordinates);

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
        setCoords(compareListToFindMatchingCodes);
      } catch (error) {
        console.log("there was a error " + error);
      }
    };
    getCoordinates();
  }, [dataList, searchValue]);

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
      <StateMap displayMap={dataList} centerPointOfMap={searchValue}></StateMap>
    </div>
  );
}
