import StateList from "./StateList";
import DisplayAirportCodeTitle from "./DisplayAirportCodeTitle";
import { motion, AnimatePresence } from "framer-motion";

export default function AirlineStateSearch({
  airlineSearch,
  targetCategoryValue,
  internationalSearchValue,
  selectOptionValue,
  airportName,
  mapSearch,
  closeButton,
  isScrolled,
  airlineButtons,
  setIsScrolled,
}) {
  // useEffect(() => {
  //   if (isScrolled) {
  //     const element = document.querySelector("#stateDestinationMap");

  //     if (element) {
  //       element.scrollIntoView({
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  // }, [isScrolled, targetCategoryValue]);

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

  function closeMap() {
    closeButton(false);
    airlineButtons(true);
  }

  return (
    <article
      id="stateDestinationMap"
      className={
        mapSearch && lengthOfDestinations !== 0
          ? "shadow rounded bg-white pe-sm-0 p-lg-4 mb-5 mt-3"
          : ""
      }
      style={{
        position: "relative",
      }}
    >
      <div className="container">
        {mapSearch && lengthOfDestinations !== 0 ? (
          <button
            type="button"
            style={{
              position: "absolute",
              top: -25,
              right: -25,
            }}
            className="btn-close btn-close-primary p-3 bg-white border boreder-1 border-dark rounded-circle"
            aria-label="Close"
            onClick={closeMap}
          ></button>
        ) : (
          ""
        )}

        <AnimatePresence initial={false}>
          {mapSearch && lengthOfDestinations !== 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
              className="mb-5"
            >
              <DisplayAirportCodeTitle
                selectOption={selectOptionValue}
                airlineAirportLength={lengthOfDestinations}
                airportFormValue={targetCategoryValue}
                airportName={airportName}
              />

              <StateList
                dataList={airlineSearch}
                searchValue={targetCategoryValue}
                objectState={getListOfDestinations()}
                internationalSearchValue={internationalSearchValue}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
