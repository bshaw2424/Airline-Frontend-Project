import SideNav from "./SideNav";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AirlineDropdownList({ destinations }) {
  const [airlineNames, setAirlineNames] = useState([destinations]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/airlines")
      .then(res => {
        console.log(res.data);
        setAirlineNames(res.data);
      })
      .catch(error => console.log(error));
  }, [airlineNames]);

  return (
    <span className="dropdown">
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
