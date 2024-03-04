import AirlineDataModal from "./AirlineDataModal";
import ThumbsUpIcon from "./ThumbsUpIcon";

const styles = {
  width: "96%",
  position: "relative",
  cursor: "pointer",
  background: "#fff",
};

export default function AirlineListDataLinks({ airlineNameData, icons }) {
  const create_airline_links = airlineNameData.map((airline, index) => (
    <div
      style={styles}
      key={`${airline.name}-index`}
      className={`Links py-2 mb-3 border border-primary rounded airlineNameLink Link-${
        index + 1
      } py-2`}
      data-bs-toggle="modal"
      data-bs-target={`#airlineModalData-${airline._id}`}
    >
      <h2
        style={{
          maxWidth: "100%",
          textAlign: "center",
        }}
      >
        {airline.name}
      </h2>

      {/* displays thumbs up icons with valid airport code look up */}
      {icons[index] && <ThumbsUpIcon />}
      <AirlineDataModal
        airlines={airline}
        id={`airlineModalData-${airline._id}`}
      />
    </div>
  ));

  return (
    <section>
      <div className="airline-divs mb-0 py-4">{create_airline_links}</div>
    </section>
  );
}
