export default function AirlineQuickSearch({ value, onChange }) {
  return (
    <div className="w-100">
      <label htmlFor="airportDataInput"></label>
      <input
        className="p-2 w-75 w-sm-100 w-lg-75"
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
