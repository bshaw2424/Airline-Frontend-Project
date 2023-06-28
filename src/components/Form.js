export default function Form({
  value,
  airlineSearchSubmit,
  changeSelectItems,
  clearInputField,
}) {
  return (
    <div>
      <form onSubmit={airlineSearchSubmit}>
        <div className="row d-flex justify-content-center">
          <div className="col-sm-3 d-flex">
            <label
              style={{
                alignSelf: "center",
                maxWidth: "100%",
                fontSize: "1rem",
              }}
              htmlFor="search-options"
            ></label>

            <select
              style={{ maxWidth: "100%" }}
              name="airlineOptions"
              className="form-select p-2"
              aria-label="Default select example"
              id="search-options"
            >
              <option value="state">State / Country </option>
              <option value="airport_code">Airport Code</option>
            </select>
          </div>
          <div className="col-sm-3 d-flex justify-content-center">
            <label htmlFor="airportDataInput"></label>
            <input
              className="p-2"
              style={{ alignSelf: "center", width: "100%", height: "100%" }}
              type="text"
              name="data"
              id="airportDataInput"
              onChange={clearInputField}
              value={value}
              required
            />
          </div>
          <div className="col-sm-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
