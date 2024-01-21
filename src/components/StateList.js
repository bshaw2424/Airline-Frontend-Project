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

  const un = getListOfAirlinesObject.flatMap(i => i.codes.map(i => i.code));
  const unique = [...new Set(un)];

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
