import { useLoaderData } from "react-router-dom";
import axios from "axios";

import AirlineStateSearch from "./AirlineStateSearch";
// import AirlineAirportCodeSearch from "./AirlineAirportCodeSearch";

export default function AirlineSearch() {
  const AirlineSearch = useLoaderData();

  return (
    <div
      className="container mt-5 d-flex justify-content-between"
      style={{ minHeight: "100vh" }}
    >
      {/* <AirlineAirportCodeSearch
        airportCodeSearch={AirlineSearch}
        codeCategory="airport_code"
        targetCode="PWM"
      /> */}
      <h1 style={{ fontSize: "6rem" }}>Hello world</h1>
      <AirlineStateSearch
        airlineStateSearch={AirlineSearch}
        category="state"
        targetState="California"
      />
    </div>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
