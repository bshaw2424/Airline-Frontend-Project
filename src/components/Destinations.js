import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";
import AirlineDisplayContainer from "./AirlineDisplayContainer";
import DestinationCard from "./DestinationCard";

export default function Destinations() {
  const { slug } = useParams();
  const destinations = useLoaderData();

  return (
    <>
      <AirlineDisplayContainer
        destinations={destinations}
        stateDestinations={destinations}
      />

      {/* <DestinationCard destinations={destinations} /> */}
    </>
  );
}

export const destinationsLoader = async ({ params }) => {
  const { slug } = params;

  const response = await axios.get(`http://localhost:8080/airlines/${slug}`);

  return response.data;
};
