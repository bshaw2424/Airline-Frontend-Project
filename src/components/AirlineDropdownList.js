import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AirlineDropdownList({ destinations }) {
  const [airlineNames, setAirlineNames] = useState([destinations]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/airlines")
      .then(res => {
        setAirlineNames(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <span className="dropdown ms-5">
      <button
        className="btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Change Airlines
      </button>
      <SideNav airline={airlineNames} />
    </span>
  );
}
