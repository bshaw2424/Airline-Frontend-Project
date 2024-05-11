import FeaturedAirlines from "./FeaturedAirlines";
import AirlineFeatureDescription from "./AirlineFeatureDescription";
import HomeDescription from "./HomeDescription";
import HomeImage from "./HomeImage";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const getAirlineNames = useLoaderData();
  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "0",
          }}
        >
          <HomeImage />
          <HomeDescription />
        </div>
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
