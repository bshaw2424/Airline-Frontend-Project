// import statements
import { useEffect, useState } from "react";
import AirlineDropdownList from "./AirlineDropdownList";
import DisplayFilterList from "./DisplayFilterList";
import { upperCaseFirstLetterOfWord } from "../Utilities";
import ShowDataList from "./ShowDataList";
import StateFilter from "./StateFilter";
import TotalDestinationNumber from "./TotalDestinationNumber";
import AirlineInformationDisplay from "./AirlineInformationDisplay";
import NotificationPage from "./NotificationPage";
import Loader from "./Loader";
import { DestinationCategorySelect } from "./DestinationCategorySelect";
// import e from "cors";

export default function AirlineDisplayContainer({ destinations }) {
  // state management

  const [domesticData, setDomesticData] = useState(true);
  const [internationalData, setInternationalData] = useState(false);
  const [seasonalData, setSeasonalData] = useState(false);
  const [selectChange, setSelectChange] = useState(false);

  const [notificationMessage, setNotificationMessage] = useState(false);
  const [destinationNumber, setDestinationNumber] = useState(
    destinations.destinations.filter(
      listData => listData.international === "false",
    ).length,
  );
  const [locationState, setLocationState] = useState("");
  const [locationShow, setLocationShow] = useState(true);
  const [destinationErrorMessage, setDestinationErrorMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // Methods
  function filteredLists(category, stringBoolean) {
    const dataList = destinations.destinations.filter(
      listData => listData[category] === stringBoolean,
    );
    return dataList.length;
  }

  function getTotalFilteredDestinationNumber(e, category, value) {
    const destinationTotalNumber = destinations.destinations
      .filter(destination => destination[category] === value)
      .map(a => a.name).length;

    if (destinationTotalNumber > 1) {
      setDestinationNumber(destinationTotalNumber);
      setNotificationMessage(false);
    }
    if (destinationTotalNumber < 1) {
      setNotificationMessage(true);
      setDestinationNumber(destinationTotalNumber);
      setDestinationErrorMessage(
        `No ${upperCaseFirstLetterOfWord(e.target.value)} Destinations`,
      );
    }
  }

  function getFilteredStatesDestinationNumber(targetElement) {
    const getDestinationStateDropdownTotal = destinations.destinations.filter(
      a => a.state === targetElement.target.value,
    ).length;

    if (targetElement.target.value) {
      setDestinationNumber(
        `${targetElement.target.value} - ${getDestinationStateDropdownTotal}`,
      );
    }
    setNotificationMessage(false);
  }

  function Domestic(e) {
    setDestinationNumber(filteredLists("international", "false"));
    getTotalFilteredDestinationNumber(e, "international", "false");
    setLocationState("");
    setDomesticData(true);
    setInternationalData(false);
    setSeasonalData(false);
    setLocationShow(false);
  }
  function InternationalData(e) {
    setDestinationNumber(filteredLists("international", "false"));
    getTotalFilteredDestinationNumber(e, "international", "true");
    setLocationState("");
    setDomesticData(false);
    setInternationalData(true);
    setSeasonalData(false);
    setLocationShow(false);
  }
  function SeasonalData(e) {
    setDestinationNumber(filteredLists("seasonal", "false"));
    getTotalFilteredDestinationNumber(e, "seasonal", "true");
    setSeasonalData(true);
    setLocationState("");
    setDomesticData(false);
    setInternationalData(false);
    setLocationShow(false);
  }

  function handleLocationChange(e) {
    getFilteredStatesDestinationNumber(e);
    setLocationState(e.target.value);
    setLocationShow(true);
    setInternationalData(false);
    setDomesticData(false);
    setSeasonalData(false);
    setDestinationErrorMessage("");
  }

  useEffect(() => {
    setDestinationNumber(
      destinations.destinations.filter(
        listData => listData.international === "false",
      ).length,
    );
  }, [destinations.destinations]);

  function resetDestination() {
    setIsLoading(true);
    setDomesticData(true);
  }

  useEffect(() => {
    if (!domesticData) {
      setSelectChange(true);
    }
  }, [domesticData, selectChange]);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader loading={isLoading} />
        </div>
      ) : (
        <section className="container">
          <div className="d-flex flex-column flex-sm-column flex-xl-row justify-content-xl-between align-items-center">
            <AirlineInformationDisplay airline={destinations} />

            <TotalDestinationNumber
              totalFightDestinations={destinationNumber}
            />
          </div>

          {/* filter through airline data buttons */}
          <section
            style={{ display: "flex", justifyContent: "space-between" }}
            className="d-flex w-100 flex-column flex-sm-column flex-xl-row justify-content-xl-between align-items-center p-3 mt-3  mb-sm-5 mb-lg-4 mb-4 button-contain rounded"
          >
            <DestinationCategorySelect
              InternationalData={InternationalData}
              Domestic={Domestic}
              SeasonalData={SeasonalData}
              setDestinationErrorMessage={setDestinationErrorMessage}
              selectValue={selectChange}
            />

            <div className="d-flex flex-column flex-xl-row flex-sm-column  align-items-xl-center justify-content-xl-end width">
              <AirlineDropdownList getAirlineUrl={resetDestination} />

              <StateFilter
                onChange={handleLocationChange}
                destinations={destinations}
              />
            </div>
          </section>

          {/* shows international list */}
          {internationalData && (
            <ShowDataList
              destinations={destinations}
              dataCategory={"international"}
              value={"true"}
            />
          )}

          {/* shows seasonal list  */}
          {seasonalData && (
            <ShowDataList
              destinations={destinations}
              dataCategory={"seasonal"}
              value={"true"}
            />
          )}

          {/* shows domestic list */}

          {domesticData && (
            <ShowDataList
              destinations={destinations}
              dataCategory={"international"}
              value={"false"}
            />
          )}

          {locationShow && (
            <DisplayFilterList
              getDestinationsData={destinations}
              targetValue={locationState}
            />
          )}

          {notificationMessage && (
            <NotificationPage destinationType={destinationErrorMessage} />
          )}
        </section>
      )}
    </>
  );
}
