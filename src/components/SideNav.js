import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SideNav() {
  const [airline, setAirline] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/airlines")
      .then(res => {
        setAirline(res.data);
      })
      .catch(error => console.log(error));
  });

  return (
    <>
      <ul>
        {airline.map(name => (
          <li key={name._id}>
            <Link
              style={{ width: "100%", display: "inline-block" }}
              to={`/airlines/${name.slug}`}
            >
              {name.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
