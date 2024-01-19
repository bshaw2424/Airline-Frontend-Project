import React, { useState } from "react";
import { changeAirportCodeToIcaoCode } from "../Utilities";

export default function StateList({ dataList, searchValue, objectState }) {
  const [getActiveState, setActiveState] = useState(objectState);

  const handleStateClick = airlineName => {
    setActiveState(prevState => ({
      ...Object.fromEntries(
        Object.entries(prevState).map(([key]) => [key, false]),
      ),
      [airlineName]: true,
    }));
  };

  const getListOfAirlines = dataList
    .map(state => ({
      name: state.name,
      codes: state.destinations
        .filter(location => location.state === searchValue)
        .map(location => changeAirportCodeToIcaoCode(location.airport_code)),
      length: state.destinations
        .filter(
          location =>
            location.state === searchValue &&
            location.international === "false",
        )
        .map(location => location.airport_code).length,
    }))
    .filter(listItem => listItem.codes.length !== 0);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        fontSize: "1.2rem",
      }}
    >
      <ul style={{ listStyle: "none" }}>
        {getListOfAirlines.map((airline, index) => (
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
    </div>
  );
}
