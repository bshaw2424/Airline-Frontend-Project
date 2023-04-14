import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function AirlineSearch() {
  const AirlineSearch = useLoaderData();

  return (
    <div>
      {AirlineSearch.map(a => (
        <>
          <div>
            <strong>{a.name}</strong> - ssd{" "}
            {a.destinations.filter(a => a.seasonal === "true").length}
          </div>
        </>
      ))}
    </div>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
