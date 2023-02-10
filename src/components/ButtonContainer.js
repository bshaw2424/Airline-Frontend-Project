import { useState } from "react";
import AirlineDropdownList from "./AirlineDropdownList";
import FilterListButtons from "./FilterListButtons";
import InternationalList from "./InternationalList";
import MainDestinationList from "./MainDestinationList";
import { internationalTotalDestinations } from "../UtilityFunctions";
import SeasonalList from "./SeasonalList";
import Response from "./Response";
import AirlineDisplay from "./AirlineDisplay";

export default function International({ destinations }) {
  const [destination, setDestination] = useState(
    destinations.destinations.length,
  );
  const [destinationList, setDestinationList] = useState(false);
  const [seasonalList, setSeasonalList] = useState(false);
  const [mainList, setMainList] = useState(true);
  const [name, setName] = useState(["Seasonal"]);

  function seasonalTotalDestinations() {
    setDestination(
      destinations.destinations.filter(arr => arr.seasonal === "true").length,
    );
    setSeasonalList(true);
    setDestinationList(false);
    setMainList(false);
  }

  function TotalDestinations() {
    setDestination(destinations.destinations.filter(arr => arr).length);
    setMainList(true);
    setSeasonalList(false);
    setDestinationList(false);
  }

  function airlineNameDropDownMenu() {
    console.log("hello world");
  }

  return (
    <section className="container my-5">
      <div>
        <h1 className="text-center">
          <img
            src={`../../../${destinations.logo}.png`}
            alt={`${destinations.name} logo`}
            height="128px"
            width="255px"
            style={{ objectFit: "contain" }}
          />
          <p>Destinations - {destination}</p>
          <AirlineDisplay mike={destinations} />
        </h1>
        <p style={{ textAlign: "center" }}>
          Official Website -{" "}
          <a
            href={destinations.website}
            alt={`${destinations.name}'s website`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "blue" }}
          >
            {destinations.website}
          </a>
        </p>
      </div>
      <section className="d-flex justify-content-center">
        <FilterListButtons
          btnName={"All"}
          className={"primary"}
          destinations={destinations}
          choice={() => {
            TotalDestinations();
          }}
        />
        <FilterListButtons
          btnName={"International"}
          className={"primary"}
          destinations={destinations}
          choice={() => {
            internationalTotalDestinations(
              setDestination,
              destinations,
              setDestinationList,
              setMainList,
              setSeasonalList,
            );
          }}
        />

        <FilterListButtons
          btnName={"Seasonal"}
          className={"primary"}
          destinations={destinations}
          choice={() => {
            seasonalTotalDestinations();
          }}
        />
        <AirlineDropdownList
          destinations={destinations}
          onClick={() => airlineNameDropDownMenu()}
        />
      </section>

      {/* show the all the destinations */}
      {mainList ? <MainDestinationList destinations={destinations} /> : null}

      {/* show only the international destinations */}
      {destinationList ? (
        <InternationalList destinations={destinations} />
      ) : null}

      {/* show only seasonal destinations */}
      {seasonalList ? <SeasonalList destinations={destinations} /> : null}
      {destination === 0 ? (
        <Response message={`Currently No ${name} destinations`} />
      ) : null}
    </section>
  );
}
