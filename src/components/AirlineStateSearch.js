import React, { useEffect } from "react";
import StateList from "./StateList";
import AirlineSearchResultsDisplay from "./AirlineSearchResultsDisplay";
import Error from "./Error";

export default function AirlineStateSearch({
  airlineSearch,
  targetCategoryValue,
  internationalSearchValue,
  selectOptionValue,
  message,
  messageDiv,
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

  const getSound = () => {
    const airline = airlineSearch
      .map(item =>
        item.destinations
          .filter(item => item.international === "true")
          .map(a => a.state.toLowerCase()),
      )
      .reduce((a, b) => a.concat(b), []);

    return [...new Set(airline)];
  };

  const findValue = getSound().includes(targetCategoryValue.toLowerCase());

  const lengthOfDestinations = getListOfDestinations();

  return (
    <article className={lengthOfDestinations === 0 ? "mt-0" : "mt-5"}>
      <div id="stateDestinationMap">
        <div className="d-flex justify-content-evenly flex-column">
          {lengthOfDestinations === 0 && (
            <Error message={message} messageDiv={messageDiv} />
          )}

          {!findValue && lengthOfDestinations !== 0 && (
            <>
              {selectOptionValue === "state" && (
                <>
                  <StateList
                    dataList={airlineSearch}
                    searchValue={targetCategoryValue}
                    objectState={getListOfDestinations()}
                    internationalSearchValue={internationalSearchValue}
                  />
                  <AirlineSearchResultsDisplay
                    selectOptionValue={selectOptionValue}
                    airlineNumber={getListOfDestinations()}
                    targetValue={targetCategoryValue}
                  />
                </>
              )}
            </>
          )}
          {findValue && lengthOfDestinations !== 0 && (
            <>
              {selectOptionValue === "international" && (
                <>
                  <StateList
                    dataList={airlineSearch}
                    searchValue={targetCategoryValue}
                    objectState={getListOfDestinations()}
                    internationalSearchValue={internationalSearchValue}
                  />
                  <AirlineSearchResultsDisplay
                    selectOptionValue={selectOptionValue}
                    airlineNumber={getListOfDestinations()}
                    targetValue={targetCategoryValue}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  );
}
