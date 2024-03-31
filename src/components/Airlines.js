import { useLoaderData } from "react-router-dom";

import AirlineListDataLinks from "./AirlineListDataLinks";

export default function Airlines({ targetInput, showIconForAirportCode }) {
  // using a loader to fetch the data
  const airlineData = useLoaderData();

  const getAirlineListItemBasedOnActiveStatusToShowIcon = () => {
    const list = [];
    const activeList = [];

    for (const airline of airlineData) {
      const destinationsLength = airline.destinations.filter(
        destination => destination.airport_code === targetInput,
      ).length;

      list.push({ name: airline.name, length: destinationsLength });
      activeList.push({ name: airline.name, active: false });
    }

    const filteredList = list.filter(a => a.length > 0).map(a => a.name);

    const very = activeList.map(destination => {
      if (filteredList.includes(destination.name)) {
        return { ...destination, active: !destination.active };
      }
      return destination;
    });

    const bee = very.map(a => a.active);

    return bee;
  };

  return (
    <>
      <section
        className="pt-3 mb-5"
        style={{ background: "rgba(173, 216, 230, 0.1)" }}
      >
        <AirlineListDataLinks
          airlineNameData={airlineData}
          icons={
            showIconForAirportCode === "airport_code"
              ? getAirlineListItemBasedOnActiveStatusToShowIcon()
              : ""
          }
        />
      </section>
    </>
  );
}

// export const destinationIndexLoader = async () => {
//   const response = await axios.get(`http://localhost:8080/airlines/info`);

//   return response.data;
// };
