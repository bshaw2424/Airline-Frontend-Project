import SeasonalInternationalCheck from "./SeasonalInternationalCheck";

export default function ShowDataList({ destinations, dataCategory, value }) {
  return (
    <div className="row gy-3 mt-3 mb-4">
      {destinations.destinations.map(
        items =>
          items[dataCategory] === value && (
            <div
              key={items._id}
              className="d-flex col-xs-6 col-sm-12 card px-5 pt-3 list-flex"
            >
              <div
                className="width"
                style={{ width: "100%", paddingTop: "1.5rem" }}
              >
                <h5 className="card-title d-flex align-items-center justify-content-start">
                  {items.name} - <b>{items.airport_code}</b>
                </h5>
              </div>
              <div className="width" style={{ padding: "0 0 0 4rem" }}>
                <p>
                  <b>Airport:</b> {items.airport_name}
                </p>
                <p>
                  <b>Location:</b> {items.city}, {items.state}
                </p>
              </div>
              <SeasonalInternationalCheck
                destinationCategory={items}
                stringBooleanValue={"true"}
              />
            </div>
          ),
      )}
    </div>
  );
}
