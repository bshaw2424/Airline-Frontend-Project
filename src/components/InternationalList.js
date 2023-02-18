export default function InternationalList({ destinations }) {
  return (
    <>
      <div className="row gy-3 my-3 container">
        {destinations.destinations.map(items =>
          items.international === "true" ? (
            <div
              key={items._id}
              className="d-flex col-xs-6 col-sm-12 card p-3 list-flex"
            >
              <div style={{ width: "100%" }}>
                <h5 className="card-title">
                  {items.name} - <b>{items.airport_code}</b>
                </h5>
              </div>
              <div style={{ width: "100%" }}>
                <p>
                  <b>Airport:</b> {items.airport_name}
                </p>
                <p>
                  <b>Location:</b> {items.city}, {items.state}
                </p>
              </div>
              <div style={{ width: "100%" }}>
                <p>
                  <b>International:</b>
                  {items.international === "true" ? (
                    <img src={"../check.svg"} alt="yes" />
                  ) : (
                    <img src={"../block.svg"} alt="no" />
                  )}
                </p>
                <p>
                  <b>Seasonal:</b>
                  {items.seasonal === "true" ? (
                    <img src={"../check.svg"} alt="yes" />
                  ) : (
                    <img src={"../block.svg"} alt="no" />
                  )}
                </p>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </>
  );
}
