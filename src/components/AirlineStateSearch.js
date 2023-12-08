import { getFilteredDataByState } from "../Utilities";
import React, { useEffect } from "react";
import DisclaimerMessage from "./DisclaimerMessage";
import StateMap from "./StateMap";

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
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [isScrolled]);

  return (
    <article id="stateDestinationMap" style={{ paddingTop: "4rem" }}>
      <div>
        <div className="d-flex justify-content-evenly ">
          <div style={{ height: "100%", width: "100%" }}>
            {airlineSearch.map(airline => (
              <>
                {getFilteredDataByState(airline, "state", targetCategoryValue)}
              </>
            ))}
          </div>
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
