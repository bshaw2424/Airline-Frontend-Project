import { useState } from "react";
import AirlineDropdownList from "./AirlineDropdownList";
import FilterListButtons from "./FilterListButtons";
import DisplayFilterList from "./DisplayFilterList";
import { getStates } from "../Utilities";
import ShowDataList from "./ShowDataList";

import StateFilter from "./StateFilter";
import MainDestinationList from "./MainDestinationList";
import TotalDestinationNumber from "./TotalDestinationNumber";
import AirlineInformationDisplay from "./AirlineInformationDisplay";

export default function ButtonContainer({ destinations }) {
  const [mainData, setMainData] = useState(true);
  const [seasonalData, setSeasonalData] = useState();
  const [internationalData, setInternationalData] = useState();
  const [destinationNumber, setDestinatonNumber] = useState(
    destinations.destinations.length,
  );
  const [locationState, setLocationState] = useState(0);
  const [locationShow, setLocationShow] = useState(true);

  function filteredLists(category, stringBoolean) {
    const dataList = destinations.destinations.filter(
      listData => listData[category] === stringBoolean,
    );
    return dataList.length;
  }
  function getTotalDestinationNumber(target) {
    if (target.currentTarget.innerText) {
      setDestinatonNumber(
        target.currentTarget.innerText +
          " destinations - " +
          destinations.destinations.map(a => a.name).length,
      );
    }
  }
  function getTotalFilteredDestinationNumber(target, category) {
    if (target.currentTarget.innerText) {
      setDestinatonNumber(
        target.currentTarget.innerText +
          " destinations - " +
          destinations.destinations
            .filter(destination => destination[category] === "true")
            .map(a => a.name).length,
      );
    }
  }
  function getFilteredStatesDestinationNumber(targetElement) {
    const getDestinationStateDropdownTotal = destinations.destinations.filter(
      a => a.state === targetElement.target.value,
    ).length;
    console.log(getDestinationStateDropdownTotal);
    if (targetElement.target.value) {
      setDestinatonNumber(
        `${targetElement.target.value} Destinations - ${getDestinationStateDropdownTotal}`,
      );
    }
  }
  function MainData(e) {
    setDestinatonNumber(
      () => destinations.destinations.filter(mainList => mainList).length,
    );
    getTotalDestinationNumber(e);
    setLocationState("");
    setMainData(true);
    setInternationalData(false);
    setSeasonalData(false);
    setLocationShow(false);
  }
  function InternationalData(e) {
    setDestinatonNumber(filteredLists("international", "true"));
    getTotalFilteredDestinationNumber(e, "international");
    setLocationState("");
    setInternationalData(true);
    setMainData(false);
    setSeasonalData(false);
    setLocationShow(false);
  }
  function SeasonalData(e) {
    setDestinatonNumber(filteredLists("seasonal", "true"));
    getTotalFilteredDestinationNumber(e, "seasonal");
    setSeasonalData(true);
    setLocationState("");
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
    setSeasonalData(false);
  }

  return (
    <section className="container">
      <div className="d-flex align-items-center justify-content-between">
        <AirlineInformationDisplay airline={destinations} />
        {/* destination counter */}
        <TotalDestinationNumber totalFightDestinations={destinationNumber} />
      </div>

      {/* filter through airline data buttons */}
      <section
        className="d-flex justify-content-between p-4 align-items-center mt-3"
        style={{ outline: "2px solid #333" }}
      >
        <div>
          <FilterListButtons
            btnName={"All"}
            className={"primary"}
            destinations={destinations}
            listData={e => {
              MainData(e);
            }}
          />
          <FilterListButtons
            btnName={"International"}
            className={"primary"}
            listData={e => {
              InternationalData(e);
            }}
          />

          <FilterListButtons
            btnName={"Seasonal"}
            className={"primary"}
            destinations={destinations}
            listData={e => {
              SeasonalData(e);
            }}
          />
        </div>
        <div className="d-flex">
          <AirlineDropdownList destinations={destinations} />

          <StateFilter
            dropDownName={"Filter By State"}
            state={getStates(destinations)}
            onChange={e => handleLocationChange(e)}
            value={locationState}
          />
        </div>
      </section>

      {/* data display */}

      {destinationNumber === 0 ? (
        <h1
          className="text-center d-flex justify-content-center mt-5"
          style={{ height: "100vh" }}
        >
          Currently No Destination
        </h1>
      ) : null}

      {mainData && <MainDestinationList destinations={destinations} />}
      {internationalData && (
        <ShowDataList
          destinations={destinations}
          dataCategory={"international"}
        />
      )}
      {seasonalData && (
        <ShowDataList destinations={destinations} dataCategory={"seasonal"} />
      )}
      {locationShow && (
        <DisplayFilterList
          stateLocationData={destinations}
          targetValue={locationState}
        />
      )}
    </section>
  );
}
