import { useLoaderData } from "react-router-dom";
import axios from "axios";
import AirlineListDisplay from "./AirlineListDisplay";
import AirlineListDataLinks from "./AirlineListDataLinks";

export default function Airlines({ targetInput, showIconForAirportCode }) {
  // using a loader to fetch the data
  const airlineData = useLoaderData();

  const getAirlineListItemBasedOnActiveStatusToShowIcon = () => {
    const list = [];
    const activeList = [];

    const a = airlineData.map(a => a.name);
    const b = airlineData.map(
      a => a.destinations.filter(a => a.airport_code === targetInput).length,
    );

    for (let i = 0; i < b.length; i++) {
      list.push({ name: a[i], length: b[i] });
      activeList.push({ name: a[i], active: false });
    }

    const able = list.filter(a => a.length > 0).map(a => a.name);

    const very = activeList.map(an => {
      if (able.includes(an.name)) {
        return { ...an, active: !an.active };
      }
      return an;
    });

    const bee = very.map(a => a.active);

    return bee;
  };

  return (
    <section
      className="pt-3"
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
      <div className="container">
        <AirlineListDisplay airline={airlineData} />
      </div>
    </section>
  );
}

export const destinationIndexLoader = async () => {
  const response = await axios.get(`http://localhost:8080/airlines/info`);

  return response.data;
};
