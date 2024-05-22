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
      <div>
        <p
          style={{
            fontSize: "3rem",
            color: "#333",
            textTransform: "capitalize",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <span className="me-3 hero-icon">
            <SlLocationPin />
          </span>
          Finding your next favorite travel destination awaits.
        </p>
        <div className=" mt-5 w-100 home-description-button-container">
          <Link
            className="btn btn-outline-dark mt-1 rounded-2 hero-btn"
            to="/airlines"
          >
            View Airlines
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeDescription;
