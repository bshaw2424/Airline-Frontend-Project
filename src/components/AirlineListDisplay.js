import { getFilteredAirportCodeOrCity } from "../Utilities";

const displayMessage = {
  show: "block",
  hide: "none",
  style: "none",
  textSize: "1.2rem",
};

const grid = {
  style: "grid",
  columns: "repeat(3, auto)",
};

export default function AirlineListDisplay({
  airlineSearch,
  category,
  targetCategoryValue,
  count,
}) {
  return (
    <div className="my-3" style={{ width: "100%" }}>
      <h2 className="text-center">{count}</h2>
      <div
        style={{
          display: grid.style,
          gridTemplateColumns: grid.columns,
          paddingTop: "1rem",
        }}
      >
        {airlineSearch.map(airline => (
          <>
            {getFilteredAirportCodeOrCity(
              airline,
              category,
              targetCategoryValue,
            )}
          </>
        ))}
      </div>
    </div>
  );
}
