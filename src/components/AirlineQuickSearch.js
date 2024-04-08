export default function AirlineQuickSearch({ value, onChange }) {
  return (
    <>
      <label htmlFor="airportDataInput"></label>
      <input
        className="p-2 w-100 w-sm-75 mt-3 mt-sm-3 mt-lg-0"
        type="text"
        name="data"
        id="airportDataInput"
        onChange={onChange}
        value={value}
        required
      />
    </>
  );
}
