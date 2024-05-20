import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
// import { MdLocationOn } from "react-icons/md";
const HomeDescription = () => {
  return (
    <section
      style={{
        height: "100vh",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="border border-1 border-dark p-5 rounded-4">
        <p
          style={{
            fontSize: "3rem",
            borderBottom: "1px solid #333",
            lineHeight: "2.5rem",
            color: "#333",
            textTransform: "capitalize",
          }}
          className="d-flex justify-content-center align-items-center pb-3"
        >
          <span className="me-3">
            <SlLocationPin />
            {/* <MdLocationOn /> */}
          </span>
          Finding your next favorite travel destination awaits.
        </p>
        <Link
          style={{
            width: "25%",
            boxShadow: "0px 4px 10px 0px rgba(0, 0, 0, 0.5)",
          }}
          className="btn btn-primary text-white mt-3"
          to="/airlines"
        >
          View Airlines
        </Link>
      </div>
    </section>
  );
};

export default HomeDescription;
