import { CiSearch, CiLocationOn } from "react-icons/ci";
import { GiCommercialAirplane } from "react-icons/gi";
import AirlineFeature from "./AirlineFeature";

const AirlineFeatureDescription = () => {
  return (
    <section
      className="w-100"
      id="feature-description"
      style={{ background: "#f4f4f4" }}
    >
      <div className="d-flex justify-content-evenly container py-5">
        <AirlineFeature
          icons={<CiSearch fontSize="2rem" />}
          description="Search domestic, international, and seasonal destinations"
          isLast={false}
        />
        <AirlineFeature
          icons={<GiCommercialAirplane fontSize="2rem" />}
          description="10 largest airlines operating in the United States."
          isLast={false}
        />
        <AirlineFeature
          icons={<CiLocationOn fontSize="2rem" />}
          description="Search by airport code or state / country *state search relative to United States*"
          isLast={true}
        />
      </div>
    </section>
  );
};

export default AirlineFeatureDescription;
