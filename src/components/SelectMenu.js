export default function SelectMenu({ onChange, defaultValue }) {
  return (
    <div className="col-sm-3 d-flex">
      <label
        style={{
          alignSelf: "center",
          maxWidth: "100%",
          fontSize: "1rem",
        }}
        htmlFor="default"
      ></label>
      <select
        style={{ maxWidth: "100%" }}
        name="airlineOptions"
        className="form-select p-2"
        aria-label="Default select example"
        id="search-options"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        <option value="select_option" disabled selected>
          Select an option
        </option>
        <option value="state">State / Country</option>

        <option value="airport_code">Airport Code</option>
      </select>
    </div>
  );
}
