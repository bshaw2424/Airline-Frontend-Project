import { useState } from "react";
import AirlineDropdownList from "./AirlineDropdownList";
import FilterListButtons from "./FilterListButtons";
import InternationalList from "./InternationalList";

import StateFilter from "./StateFilter";
import MainDestinationList from "./MainDestinationList";
import SeasonalList from "./SeasonalList";

export default function ButtonContainer({ destinations }) {
  const [mainData, setMainData] = useState(true);
  const [seasonalData, setSeasonalData] = useState();
  const [internationalData, setInternationalData] = useState();
  const [destinationNumber, setDestinatonNumber] = useState(
    destinations.destinations.length,
  );
  function MainData() {
    setDestinatonNumber(
      destinations.destinations.filter(mainList => mainList).length,
    );
    setMainData(true);
    setInternationalData(false);
    seasonalData(false);
  }
  function InternationalData() {
    setDestinatonNumber(
      destinations.destinations.filter(
        internationalList => internationalList.international === "true",
      ).length,
    );

    setInternationalData(true);
    setMainData(false);
    setSeasonalData(false);
  }
  function SeasonalData() {
    setDestinatonNumber(
      destinations.destinations.filter(
        seasonalList => seasonalList.seasonal === "true",
      ).length,
    );
    setSeasonalData(true);
    setMainData(false);
    setInternationalData(false);
  }
  return (
    <section className="container m-5">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={`../../../${destinations.logo}.png`}
            alt={`${destinations.name} logo`}
            height="128px"
            width="255px"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div>
          <h1 className="text-center mb-3">
            {destinationNumber} - Destinations
          </h1>

          <p style={{ textAlign: "center" }}>
            Official Website -
            <a
              href={destinations.website}
              alt={`${destinations.name}'s website`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "blue" }}
              className="px-1"
            >
              {destinations.website}
            </a>
          </p>
        </div>
      </div>

      {/* filter through airline data buttons */}
      <section
        className="d-flex justify-content-between p-4 align-items-center"
        style={{ outline: "2px solid #333" }}
      >
        <div>
          <FilterListButtons
            btnName={"All"}
            className={"primary"}
            destinations={destinations}
            listData={() => {
              MainData();
            }}
          />
          <FilterListButtons
            btnName={"International"}
            className={"primary"}
            listData={() => {
              InternationalData();
            }}
          />

          <FilterListButtons
            btnName={"Seasonal"}
            className={"primary"}
            destinations={destinations}
            listData={() => {
              SeasonalData();
            }}
          />
        </div>
        <div className="d-flex">
          <AirlineDropdownList destinations={destinations} />
          <StateFilter state={destinations} dropDownName={"Filter By State"} />
        </div>
      </section>

      {/* data display */}
      {MainData}
      {destinationNumber === 0 ? <h1>Currently No Destination</h1> : null}
      {internationalData && <InternationalList destinations={destinations} />}
      {mainData && <MainDestinationList destinations={destinations} />}
      {seasonalData && <SeasonalList destinations={destinations} />}
    </section>
  );
}
