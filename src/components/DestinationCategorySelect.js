import { useEffect, useState } from "react";

export const DestinationCategorySelect = ({
  InternationalData,
  Domestic,
  SeasonalData,
  setDestinationErrorMessage,
}) => {
  const [listType, setListType] = useState();

  const showAirlineFlightList = e => {
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

  useEffect(() => {
    setListType("domestic");
  }, []);
  console.log(listType);

  const changeValue = e => {
    setDestinationErrorMessage(e.target.value);
    setListType(e.target.value);
    showAirlineFlightList(e);
  };

  return (
    <div className="width mb-3 mb-lg-0">
      <select
        className="form-select"
        style={{ width: "50%" }}
        onChange={changeValue}
        defaultValue="domestic"
      >
        <option value="domestic">Domestic</option>
        <option value="international">International</option>
        <option value="seasonal">Seasonal</option>
      </select>
    </div>
  );
};
