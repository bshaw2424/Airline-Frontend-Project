import FeaturedAirlines from "./FeaturedAirlines";

import AirlineFeatureDescription from "./AirlineFeatureDescription";

import { useLoaderData } from "react-router-dom";
import axios from "axios";
import HeroImage from "./HeroImage";

export default function Home() {
  const getAirlineNames = useLoaderData();

  return (
    <main>
      <div id="hero" style={{ height: "100%", width: "100%" }} className="mb-5">
        <HeroImage />
      </div>
      <FeaturedAirlines airlineNames={getAirlineNames} />
      <AirlineFeatureDescription />
    </main>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
