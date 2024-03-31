// import statements
import { useState } from "react";
import AirlineDropdownList from "./AirlineDropdownList";
import DisplayFilterList from "./DisplayFilterList";
import { getStates, upperCaseFirstLetterOfWord } from "../Utilities";
import ShowDataList from "./ShowDataList";
import StateFilter from "./StateFilter";
import MainDestinationList from "./MainDestinationList";
import TotalDestinationNumber from "./TotalDestinationNumber";
import AirlineInformationDisplay from "./AirlineInformationDisplay";
import NotificationPage from "./NotificationPage";
// import e from "cors";

export default function AirlineDisplayContainer({ destinations }) {
  // state management
  // const [mainData, setMainData] = useState(true);
  const [domesticData, setDomesticData] = useState(false);
  const [seasonalData, setSeasonalData] = useState();
  const [getButtonInnertext, setButtonInnertext] = useState(false);
  const [internationalData, setInternationalData] = useState();
  const [destinationNumber, setDestinatonNumber] = useState(
    destinations.destinations.length,
  );
  const [locationState, setLocationState] = useState(0);
  const [locationShow, setLocationShow] = useState(true);
  const [ace, setAce] = useState("");
  const [listType, setListType] = useState();

  // Methods
  function filteredLists(category, stringBoolean) {
    const dataList = destinations.destinations.filter(
      listData => listData[category] === stringBoolean,
    );
    return dataList.length;
  }

  function getTotalMainFilteredDestinationNumber(e) {
    const number = destinations.destinations.map(a => a.name).length;

    if (e.target.value) {
      setDestinatonNumber(`${number}`);
      setButtonInnertext(true);
      setAce(`no ${e.target.value.toUpperCase()} Destinations.`);
    }
  }

  function getTotalFilteredDestinationNumber(e, category, value) {
    const destinationTotalNumber = destinations.destinations
      .filter(destination => destination[category] === value)
      .map(a => a.name).length;

    if (destinationTotalNumber > 1) {
      setDestinatonNumber(destinationTotalNumber);
      setButtonInnertext(false);
    }
    if (destinationTotalNumber < 1) {
      setButtonInnertext(true);
      setDestinatonNumber(destinationTotalNumber);
      setAce(`No ${upperCaseFirstLetterOfWord(e.target.value)} Destinations`);
    }
  }

  function getFilteredStatesDestinationNumber(targetElement) {
    const getDestinationStateDropdownTotal = destinations.destinations.filter(
      a => a.state === targetElement.target.value,
    ).length;

    if (targetElement.target.value) {
      setDestinatonNumber(
        `${targetElement.target.value} - ${getDestinationStateDropdownTotal}`,
      );
    }
    setButtonInnertext(false);
  }

  // function MainData(e) {
  //   setDestinatonNumber(() =>
  //     destinations.destinations.map(mainList => mainList.length),
  //   );
  //   getTotalMainFilteredDestinationNumber(e);
  //   setLocationState("");
  //   // setMainData(true);
  //   setInternationalData(true);
  //   setSeasonalData(true);
  //   setLocationShow(false);
  // }
  function Domestic(e) {
    setDestinatonNumber(filteredLists("international", "false"));
    getTotalFilteredDestinationNumber(e, "international", "false");
    setLocationState("");
    setDomesticData(true);
    setInternationalData(false);
    // setMainData(false);
    setSeasonalData(false);
    setLocationShow(false);
  }
  function InternationalData(e) {
    setDestinatonNumber(filteredLists("international", "false"));
    getTotalFilteredDestinationNumber(e, "international", "true");
    setLocationState("");
    setDomesticData(false);
    setInternationalData(true);
    // setMainData(false);
    setSeasonalData(false);
    setLocationShow(false);
  }
  function SeasonalData(e) {
    setDestinatonNumber(filteredLists("seasonal", "false"));
    getTotalFilteredDestinationNumber(e, "seasonal", "true");
    setSeasonalData(true);
    setLocationState("");
    setDomesticData(false);
    // setMainData(false);
    setInternationalData(false);
    setLocationShow(false);
  }
  function handleLocationChange(e) {
    getFilteredStatesDestinationNumber(e);
    setLocationState(e.target.value);
    setLocationShow(true);
    // setMainData(false);
    setInternationalData(false);
    setDomesticData(false);
    setSeasonalData(false);
    setListType("");
    setAce("");
  }
  function resetDestination(e) {
    // setMainData(true);
    destinations.destinations.map(airline =>
      setDestinatonNumber(airline.destinations.length),
    );
  }
  const changeValue = e => {
    setAce(e.target.value);
    setListType(e.target.value);
    // if (e.target.value === "all") {
    //   MainData(e);
    // }
    if (e.target.value === "international") {
      InternationalData(e);
    }
    if (e.target.value === "domestic") {
      Domestic(e);
    }
    if (e.target.value === "seasonal") {
      SeasonalData(e);
    }
  };

  return (
    <section className="container">
      <div className="d-flex flex-column flex-sm-column flex-xl-row justify-content-xl-between align-items-center">
        <AirlineInformationDisplay airline={destinations} />
        {/* destination counter */}

        <TotalDestinationNumber
          totalFightDestinations={destinationNumber}
          airlineDestinationTotal={() =>
            setDestinatonNumber(destinations.destinations.length)
          }
        />
      </div>

      {/* filter through airline data buttons */}
      <section
        style={{ display: "flex", justifyContent: "space-between" }}
        className="d-flex w-100 flex-column flex-sm-column flex-xl-row justify-content-xl-between align-items-center p-3 mt-3  mb-sm-5 mb-lg-4 mb-4 button-contain rounded"
      >
        <div className=" width mb-3 mb-lg-0" style={{ width: "40%" }}>
          <select
            className="form-select"
            onChange={e => changeValue(e)}
            value={listType}
            name=""
            id=""
          >
            <option value="disabled" className="disabled" selected>
              Filter By
            </option>
            {/* <option value="all">All</option> */}
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
            <option value="seasonal">Seasonal</option>
          </select>
        </div>
        <div className="d-flex flex-column flex-xl-row flex-sm-column  align-items-xl-center justify-content-xl-end width">
          <AirlineDropdownList
            dropDownName={"Change Airline"}
            // main={MainData}
            resetDestinationTotal={e => resetDestination(e)}
          />

          <StateFilter
            dropDownName={"Filter By State"}
            state={getStates(destinations)}
            onChange={e => handleLocationChange(e)}
            value={locationState}
          />
        </div>
      </section>

      {/* shows all destinations on initial page load (domestic, international, seasonal) */}
      {/* {mainData && <MainDestinationList destinations={destinations} />} */}

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
          stateLocationData={destinations}
          targetValue={locationState}
        />
      )}
      {getButtonInnertext && <NotificationPage destinationType={ace} />}
    </section>
  );
}
