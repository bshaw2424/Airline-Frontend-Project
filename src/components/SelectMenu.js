export default function SelectMenu({ onChange }) {
  return (
    <>
      <label htmlFor="default"></label>
      <select
        name="airlineOptions"
        className="form-select w-100 w-sm-50 py-2 me-4"
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
    </>
  );
}
