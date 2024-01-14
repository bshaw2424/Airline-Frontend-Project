import React, { useEffect } from "react";
import DisclaimerMessage from "./DisclaimerMessage";
import StateMap from "./StateMap";
import StateList from "./StateList";

export default function AirlineStateSearch({
  airlineSearch,
  targetCategoryValue,
  airlineName,
  isScrolled,
}) {
  useEffect(() => {
    if (isScrolled) {
      const element = document.getElementById("stateDestinationMap");

      if (element) {
        element.scrollIntoView({
          alignToTop: true,
          behavior: "smooth",
        });
      }
    }
  }, [isScrolled]);

  const getListOfDestinations = airlineSearch
    .map(getDestination => ({
      name: getDestination.name,
      codes: getDestination.destinations
        .filter(location => location.state === targetCategoryValue)
        .map(location => location.airport_code),
    }))
    .filter(listItem => listItem.codes.length !== 0)
    .reduce((acc, a) => {
      acc[a.name] = false;
      return acc;
    }, {});

  return (
    <article className="mt-5">
      <div id="stateDestinationMap">
        <div className="d-flex justify-content-evenly">
          <StateList
            dataList={airlineSearch}
            searchValue={targetCategoryValue}
            objectState={getListOfDestinations}
          />

          {/*  SHOWS CENTER POINT OF STATE USED INPUT */}
          <StateMap
            displayMap={airlineSearch}
            centerPointOfMap={targetCategoryValue}
          />
        </div>
      </div>
      <div className="text-center pt-4">
        <h2 style={{ fontSize: "2.4rem" }}>
          {airlineName}
          <DisclaimerMessage />
        </h2>
      </div>
    </article>
  );
}
