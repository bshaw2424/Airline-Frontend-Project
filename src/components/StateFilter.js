export default function StateFilter({ state, dropDownName, onChange, value }) {
  return (
    <select
      className="form-select"
      aria-label="Destination Location Dropdown Menu"
      value={value}
      onChange={onChange}
    >
      <option className="selected">{dropDownName}</option>

      {state.map((airlineDestinationLocation, i) => (
        // take any empty spaces from word then set it to lower case.
        <option
          // .replace(/ /g, "-").toLowerCase()
          value={airlineDestinationLocation}
          key={`{airlineDestinationLocation-${i}`}
        >
          {airlineDestinationLocation}
        </option>
      ))}
    </select>
  );
}
