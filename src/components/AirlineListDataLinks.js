import React from "react";

import AirlineDataModal from "./AirlineDataModal";

export default function AirlineListDataLinks({ airlineNameData }) {
  return (
    <div className="bg-light">
      <div className="container">
        <div
          style={{
            margin: 0,
          }}
        >
          <h1 className="text-center py-3 m-0">
            Explore Your Favorite Airline
          </h1>
        </div>
        <div
          className=" mb-0 py-2"
          style={{
            marginLeft: "0",
            marginRight: "0",
            display: "grid",
            gridTemplateColumns: "repeat(2, auto)",
            justifyItems: "center",
            width: "68%",
            margin: "auto",
          }}
        >
          {airlineNameData.map((airline, index) => (
            <div
              style={{
                width: "96%",
              }}
              key={airline._id}
              className="Links py-2 mb-3 border border-1 border-dark shadow rounded"
            >
              <h2
                className={`airlineNameLink Link-${index + 1} py-2`}
                data-bs-toggle="modal"
                data-bs-target={`#airlineModalData-${airline._id}`}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  paddingLeft: "25%",
                }}
              >
                {airline.name}
              </h2>

              <AirlineDataModal
                airlines={airline}
                id={`airlineModalData-${airline._id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
