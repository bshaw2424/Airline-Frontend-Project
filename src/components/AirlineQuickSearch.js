export default function AirlineQuickSearch({ value, onChange }) {
  return (
    <div className="d-flex col-xl-3  justify-content-center align-items-center mt-sm-3">
      <label htmlFor="airportDataInput"></label>
      <input
        className="p-2"
        style={{ alignSelf: "center", width: "100%", height: "100%" }}
        type="text"
        name="data"
        id="airportDataInput"
        onChange={onChange}
        value={value}
        required
      />
    </div>
  );
}
