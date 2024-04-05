import React, { useEffect } from "react";
import StateList from "./StateList";
import DisplayAirportCodeTitle from "./DisplayAirportCodeTitle";
import Error from "./Error";

export default function AirlineStateSearch({
  airlineSearch,
  targetCategoryValue,
  internationalSearchValue,
  selectOptionValue,
  airportName,
  mapSearch,
  message,
  messageDiv,
  closeButton,
  isScrolled,
}) {
  useEffect(() => {
    if (isScrolled) {
      const element = document.getElementById("stateDestinationMap");

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [isScrolled, targetCategoryValue]);

  const getListOfDestinations = () => {
    const getList = airlineSearch.map(getDestination => ({
      name: getDestination.name,
      codes: getDestination.destinations
        .filter(location => location.state === targetCategoryValue)
        .map(location => location.airport_code),
    }));

    return getList.filter(arrayList => arrayList.codes.length !== 0).length;
  };

  const lengthOfDestinations = getListOfDestinations();
  const mapShowStyles = {
    padding: "7rem 0",
    margin: "3rem 0",
    paddingRight: "2rem",
  };

  const mapRemoveStyles = {
    padding: "0rem",
    margin: "0rem",
    paddingRight: "0rem",
  };

  function closeMap() {
    closeButton(false);
  }

  return (
    <article
      id="stateDestinationMap"
      className={
        mapSearch && lengthOfDestinations !== 0
          ? "border shadow-sm rounded"
          : ""
      }
      style={{
        position: "relative",
        ...(mapSearch && lengthOfDestinations !== 0
          ? mapShowStyles
          : mapRemoveStyles),
      }}
    >
      {mapSearch && lengthOfDestinations !== 0 ? (
        <span
          className="bg-dark p-2 rounded-circle"
          style={{ position: "absolute", top: 370, right: -20 }}
        >
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
            onClick={closeMap}
          ></button>
        </span>
      ) : (
        ""
      )}

      {mapSearch && lengthOfDestinations !== 0 ? (
        <section>
          <StateList
            dataList={airlineSearch}
            searchValue={targetCategoryValue}
            objectState={getListOfDestinations()}
            internationalSearchValue={internationalSearchValue}
          />
          <DisplayAirportCodeTitle
            selectOption={selectOptionValue}
            airlineAirportLength={lengthOfDestinations}
            airportFormValue={targetCategoryValue}
            airportName={airportName}
          />
        </section>
      ) : (
        <Error message={message} messageDiv={messageDiv} />
      )}
    </article>
  );
}
