import React, { useEffect } from "react";
import StateList from "./StateList";
import DisplayAirportCodeTitle from "./DisplayAirportCodeTitle";
import Error from "./Error";
import { motion, AnimatePresence } from "framer-motion";

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
  };

  const mapRemoveStyles = {
    padding: "0rem",
    margin: "0rem",
    // paddingRight: "0rem",
  };

  function closeMap() {
    closeButton(false);
  }

  return (
    <article
      id="stateDestinationMap"
      className={
        mapSearch && lengthOfDestinations !== 0
          ? "border border-2 rounded pe-sm-0 pe-lg-4"
          : ""
      }
      style={{
        position: "relative",
        ...(mapSearch && lengthOfDestinations !== 0
          ? mapShowStyles
          : mapRemoveStyles),
      }}
    >
      <div className="container">
        {mapSearch && lengthOfDestinations !== 0 ? (
          <span
            className="bg-light p-2 rounded-circle border border-1 border-dark"
            style={{ position: "absolute", top: 360, right: -23, zIndex: 2 }}
          >
            <button
              type="button"
              className="btn-close btn-close-dark"
              aria-label="Close"
              onClick={closeMap}
            ></button>
          </span>
        ) : (
          ""
        )}
        <AnimatePresence initial={false}>
          {mapSearch && lengthOfDestinations !== 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
            </motion.section>
          )}{" "}
        </AnimatePresence>

        {mapSearch && lengthOfDestinations === 0 && (
          <Error message={message} messageDiv={messageDiv} />
        )}
      </div>
    </article>
  );
}
