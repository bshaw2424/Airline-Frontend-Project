import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";

const HomeDescription = () => {
  return (
    <section
      style={{
        height: "100vh",
      }}
      id="home-description-container"
      className="container d-flex justify-content-center align-items-center"
    >
      <div style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            height: "100%",
          }}
        >
          <p
            style={{
              fontSize: "3rem",
              color: "#333",
              marginLeft: "1.5rem",
              textTransform: "capitalize",
              flex: 2,
            }}
            className="d-flex justify-content-center align-items-center"
          >
            <span className="me-3 hero-icon">
              <SlLocationPin />
            </span>
            Finding your next favorite travel destination awaits.
            <span className=" w-100 home-description-button-container">
              <Link
                className="btn btn-outline-dark mt-1 rounded-2 hero-btn"
                to="/airlines"
              >
                View Airlines
              </Link>
            </span>
          </p>
          <div
            className="image-container"
            style={{
              width: "100%",
              height: "100%",
              flex: 5.5,

              alignSelf: "flex-end",
            }}
          >
            <img
              src="../airport.jpg"
              alt=""
              style={{ objectFit: "contain", height: "100%", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDescription;
