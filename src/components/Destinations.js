import { Link, useLoaderData, useParams } from "react-router-dom";
import axios from "axios";

export default function Destinations() {
  const { slug } = useParams();
  const destinations = useLoaderData();

  return (
    <div>
      <h1>
        {destinations.name} - {destinations.destinations.length}
      </h1>

      <section
        style={{
          display: "flex",
          width: "50%",
          flexWrap: "wrap",
          margin: "4rem auto",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {destinations.destinations.map(items => (
          <div
            style={{
              outline: "3px solid green",
              width: "40%",
            }}
          >
            {items.name} - <b>{items.airport_code}</b>
            <p>
              <b>Location:</b> {items.city}, {items.state}
            </p>
            <p>
              <b>Airport:</b> {items.airport_name}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

export const destinationsLoader = async ({ params }) => {
  const { slug } = params;

  const response = await axios.get(`http://localhost:8080/airlines/${slug}`);

  console.log(response.data);

  return response.data;
};
