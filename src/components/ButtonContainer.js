import React from "react";
import FilterListButtons from "./FilterListButtons";
import AirlineDropdownList from "./AirlineDropdownList";
export default function ButtonContainer({
  destinations,
  MainData,
  SeasonalData,
  InternationalData,
  listData,
}) {
  return (
    <>
      <div>
        <FilterListButtons
          btnName={"All"}
          className={"primary"}
          destinations={destinations}
          listData={MainData}
        />
        <FilterListButtons
          btnName={"International"}
          className={"primary"}
          destinations={destinations}
          listData={InternationalData}
        />

        <FilterListButtons
          btnName={"Seasonal"}
          className={"primary"}
          destinations={destinations}
          listData={SeasonalData}
        />
      </div>
      <div className="d-flex">
        <AirlineDropdownList destinations={destinations} />
      </div>
    </>
  );
}
