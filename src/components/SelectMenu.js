export default function SelectMenu({ onChange }) {
  return (
    <div className="d-flex align-items-center justify-content-center w-75 w-sm-100 w-lg-75 me-4">
      <label htmlFor="default"></label>
      <select
        name="airlineOptions"
        className="form-select"
        aria-label="Default select example"
        id="search-options"
        defaultValue="select_option"
        onChange={onChange}
      >
        <option value="select_option" disabled>
          Select an option
        </option>
        <option value="state">State / Country</option>

        <option value="airport_code">Airport Code</option>
      </select>
    </div>
  );
}
