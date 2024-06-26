import FeaturedAirlines from "../FeaturedAirlines";

import AirlineFeatureDescription from "../AirlineFeatureDescription";

import { useLoaderData, useNavigation } from "react-router-dom";
import axios from "axios";
import Hero from "./Hero";
import { useEffect, useState } from "react";
import Loader from "../Loader";

export default function Home() {
  const getAirlineNames = useLoaderData();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigation.state !== "loading" ? setIsLoading(true) : setIsLoading(false);
  }, [navigation.state]);

  return (
    <>
      <main>
        {isLoading ? (
          <>
            <Hero loading={setIsLoading} />
            <FeaturedAirlines airlineNames={getAirlineNames} />
            <AirlineFeatureDescription />
          </>
        ) : (
          <Loader loading={!isLoading} />
        )}
      </main>
    </>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
