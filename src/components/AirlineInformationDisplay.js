export default function AirlineInformationDisplay({ airline }) {
  return (
    <div className="d-flex  justify-content-center align-items-center mt-4">
      <a
        href={airline.website}
        alt={`${airline.website} name`}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={`../../../${airline.logo}.png`}
          alt={`${airline.name} logo`}
          height="100px"
          width="255px"
          style={{ objectFit: "contain", aspectRatio: 3 / 2 }}
        />
      </a>
    </div>
  );
}
