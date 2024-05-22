import React from "react";

const AirlineFeature = ({ icons, description, isLast }) => {
  const marginClass = isLast ? "me-0" : "me-5";
  return (
    <div
      className={`rounded shadow-sm d-flex justify-content-center align-items-center flex-column airline-feature`}
      style={{
        fontSize: "1.3rem",
      }}
    >
      <span>{icons}</span>
      <p className="mt-3 px-3">{description}</p>
    </div>
  );
};

export default AirlineFeature;
