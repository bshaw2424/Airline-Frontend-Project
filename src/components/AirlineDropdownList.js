import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AirlineDropdownList({
  dropDownName,
  resetDestinationTotal,
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

  return (
    <div className="dropdown">
      <button
        className="btn dropdown-toggle width my-sm-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ outline: "1px solid blue" }}
      >
        {dropDownName}
      </button>

      <ul className="dropdown-menu">
        {airlines.map(airlineNames => {
          const { slug, name, _id } = airlineNames;
          return (
            <li key={_id}>
              <Link
                onClick={resetDestinationTotal}
                to={`/airlines/${slug}/destinations`}
                className="dropdown-item"
                value={name}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
