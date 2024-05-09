import { Link } from "react-router-dom";
import FeaturedAirlines from "./FeaturedAirlines";
import AirlineFeatureDescription from "./AirlineFeatureDescription";

export default function Home() {
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
          <div
            style={{
              display: "flex",
              backgroundColor: "rgba(255,255,255, 0.6)",
              right: 150,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "35%",
              height: "50%",
              position: "absolute",
              zIndex: 1,
              outline: "1px solid #333",
              borderRadius: "1.8rem",
            }}
            className="container shadow-sm"
          >
            <h2
              style={{ fontSize: "3rem", borderBottom: "1px solid #333" }}
              className="pb-2  text-center py-2"
            >
              Next Travel Destination
            </h2>
            <div className="container">
              <p style={{ fontSize: "1.2rem" }}>
                Discover different destinations from your favorite airport and
                which airports they fly to. The curiousity for your next travel
                spot starts now.
              </p>
              <div className="d-flex justify-content-end my-3">
                <Link
                  style={{ width: "30%" }}
                  className="btn btn-primary"
                  to="/airlines"
                >
                  View Airlines
                </Link>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "100%",
              width: "100vw",
              objectFit: "contain",
              position: "relative",
            }}
            className=" d-flex justify-content-start align-items-center "
          >
            <img
              style={{
                objectFit: "contain",
                height: "100%",
                Width: "100%",
              }}
              className="rounded"
              src="airport.jpg"
              alt="pch.vector on Freepik"
            />
          </div>
        </div>
      </div>
      <FeaturedAirlines />
      <AirlineFeatureDescription />
    </main>
  );
}
