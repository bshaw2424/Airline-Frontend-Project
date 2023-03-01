import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AirlineDropdownList({
  dropDownName,
  stateLocation,
  mainPage,
}) {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/airlines`)
      .then(response => {
        setAirlines(response.data);
      })
      .catch(e => console.log(e.message));
  }, []);

  function value(e) {
    const getAirlineDestinationsLengths = airlines
      .filter(
        names =>
          names.slug === e.target.innerText.replace(/ /g, "-").toLowerCase(),
      )
      .map(
        airlineDestinationsLength =>
          airlineDestinationsLength.destinations.length,
      );
    mainPage(true);
    stateLocation(getAirlineDestinationsLengths);
  }

  return (
    <div className="dropdown">
      <button
        className="btn  dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {dropDownName}
      </button>

      <ul className="dropdown-menu">
        {airlines.map(airlineNames => (
          <li key={airlineNames._id}>
            <Link
              onClick={e => value(e)}
              to={`/airlines/${airlineNames.slug}`}
              className="dropdown-item"
              value={airlineNames.name}
            >
              {airlineNames.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
