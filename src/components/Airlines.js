import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";

export default function Airlines() {
  const airline = useLoaderData();
  return (
    <div className="container">
      <div className="my-1 p-3" style={{ width: "100%" }}>
        <h1 className="text-center p-3">Browse Airline Destinations</h1>
        <p>
          <strong>Disclaimer: </strong>Airline names and/or destinations subject
          to change at any time. We dont have any affiliation with any airlines.
          Some airlines may operate under subsidary airlines which can have more
          destinations. Visit your favorite airline's website for any additional
          information.
        </p>
      </div>
      <div className="row">
        {airline.map(airline => (
          <div key={airline._id} className="col-xs-6 col-sm-6 mb-4">
            <Link to={`/airlines/${airline.slug}`}>
              <div
                className="card"
                style={{
                  alignItems: "center",
                  padding: "4px",
                }}
              >
                <div className="card-body">
                  <h2>{airline.name}</h2>
                  <h5 style={{ margin: "0" }}>
                    <strong>Destinations: </strong>

                    {airline.destinations.length}
                  </h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export const airlineLoader = async () => {
  const response = await axios.get("http://localhost:8080/airlines");

  return response.data;
};
