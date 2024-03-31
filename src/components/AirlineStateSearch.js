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

  return (
    <article>
      {mapSearch && lengthOfDestinations !== 0 ? (
        <section id="stateDestinationMap">
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
