// import statements
import { useState } from "react";
import AirlineDropdownList from "./AirlineDropdownList";
// import FilterListButtons from "./FilterListButtons";
import DisplayFilterList from "./DisplayFilterList";
import { getStates, upperCaseFirstLetterOfWord } from "../Utilities";
import ShowDataList from "./ShowDataList";
import StateFilter from "./StateFilter";
import MainDestinationList from "./MainDestinationList";
import TotalDestinationNumber from "./TotalDestinationNumber";
import AirlineInformationDisplay from "./AirlineInformationDisplay";
import NotificationPage from "./NotificationPage";
import e from "cors";

export default function AirlineDisplayContainer({ destinations }) {
  // state management
  const [mainData, setMainData] = useState(true);
  const [domesticData, setDomesticData] = useState(false);
  const [seasonalData, setSeasonalData] = useState();
  const [getButtonInnertext, setButtonInnertext] = useState(1);
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

  // function getTotalDestinationNumber(target) {
  //   if (target.currentTarget.innerText) {
  //     setDestinatonNumber(destinations.destinations.map(a => a.name).length);
  //   }
  // }

  function getTotalMainFilteredDestinationNumber(e) {
    const number = destinations.destinations.map(a => a.name).length;

    if (e.target.value) {
      setDestinatonNumber(`${number}`);
      setButtonInnertext(number);
      setAce(`no ${e.target.value.toUpperCase()} Destinations.`);
    }
  }

  function getTotalFilteredDestinationNumber(e, category, value) {
    const number = destinations.destinations
      .filter(destination => destination[category] === value)
      .map(a => a.name).length;

    if (e.target.value) {
      setDestinatonNumber(`${number}`);
      setButtonInnertext(number);
      setAce(`No ${upperCaseFirstLetterOfWord(e.target.value)} Destinations`);
    }
  }

  // function getTotalAirlineDestinatonsNumber() {
  //   setDestinatonNumber(
  //     destinations.destinations.map(airline => airline).length,
  //   );
  // }

  function getFilteredStatesDestinationNumber(targetElement) {
    const getDestinationStateDropdownTotal = destinations.destinations.filter(
      a => a.state === targetElement.target.value,
    ).length;
    if (targetElement.target.value) {
      setDestinatonNumber(
        `${targetElement.target.value} - ${getDestinationStateDropdownTotal}`,
      );
    }
  }

  function MainData(e) {
    setDestinatonNumber(() =>
      destinations.destinations.map(mainList => mainList.length),
    );
    // getTotalDestinationNumber(e);
    getTotalMainFilteredDestinationNumber(e);
    setLocationState("");
    setMainData(true);
    setInternationalData(true);
    setSeasonalData(true);
    setLocationShow(false);
  }
  function Domestic(e) {
    setDestinatonNumber(filteredLists("international", "false"));
    getTotalFilteredDestinationNumber(e, "international", "false");
    setLocationState("");
    setDomesticData(true);
    setInternationalData(false);
    setMainData(false);
    setSeasonalData(false);
    setLocationShow(false);
  }
  function InternationalData(e) {
    setDestinatonNumber(filteredLists("international", "false"));
    getTotalFilteredDestinationNumber(e, "international", "true");
    setLocationState("");
    setDomesticData(false);
    setInternationalData(true);
    setMainData(false);
    setSeasonalData(false);
    setLocationShow(false);
  }
  function SeasonalData(e) {
    setDestinatonNumber(filteredLists("seasonal", "false"));
    getTotalFilteredDestinationNumber(e, "seasonal", "true");
    setSeasonalData(true);
    setLocationState("");
    setDomesticData(false);
    setMainData(false);
    setInternationalData(false);
    setLocationShow(false);
  }
  function handleLocationChange(e) {
    getFilteredStatesDestinationNumber(e);
    setLocationState(e.target.value);
    setLocationShow(true);
    setMainData(false);
    setInternationalData(false);
    setDomesticData(false);
    setSeasonalData(false);
    setListType("");
    setAce("");
  }
  function resetDestination(e) {
    setMainData(true);
    destinations.destinations.map(airline =>
      setDestinatonNumber(airline.destinations.length),
    );
  }
  const changeValue = e => {
    setAce(e.target.value);
    setListType(e.target.value);
    if (e.target.value === "all") {
      MainData(e);
    }
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
      <div className="d-flex align-items-center justify-content-between">
        <AirlineInformationDisplay
          airline={destinations}
          // onClick={() => getTotalAirlineDestinatonsNumber()}
        />
        {/* destination counter */}
        <TotalDestinationNumber
          totalFightDestinations={destinationNumber}
          airlineDestinationTotal={() =>
            setDestinatonNumber(destinations.destinations.length)
          }
        />
      </div>

      {/* filter through airline data buttons */}
      <section className="d-flex justify-content-between p-4 align-items-center mt-3 button-contain rounded">
        <div>
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
            <option value="all">All</option>
            <option value="domestic">Domestic</option>
            <option value="international">International</option>
            <option value="seasonal">Seasonal</option>
          </select>
        </div>
        <div className="d-flex">
          <AirlineDropdownList
            dropDownName={"Change Airline"}
            main={MainData}
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
      {mainData && <MainDestinationList destinations={destinations} />}

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
      {getButtonInnertext === 0 && <NotificationPage destinationType={ace} />}
    </section>
  );
}
