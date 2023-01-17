import axios from "axios";
import { Link, Outlet, useLoaderData } from "react-router-dom";

export default function Airlines() {
  const airline = useLoaderData();
  return (
    <>
      {airline.map(airline => (
        <div key={airline._id}>
          <Link to={`/airlines/${airline.slug}`}>{airline.name}</Link>
        </div>
      ))}
      <Outlet />
    </>
  );
}

export const airlineLoader = async () => {
  const response = await axios.get("http://localhost:8080/airlines");

  return response.data;
};
