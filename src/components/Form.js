import Button from "./Button";

export default function Form({
  value,
  airlineSearchSubmit,
  clearInputField,
  inputField,
}) {
  return (
    <div className="p-3 mb-1 shadow-sm">
      <form onSubmit={airlineSearchSubmit} className="py-2">
        <div className="row d-flex justify-content-center">
          {/* select dropdown menu for input field */}
          <div className="col-sm-3 d-flex">
            <label htmlFor="search-options"></label>
            <select
              name="airlineOptions"
              className="form-select p-2"
              aria-label="Default select example"
              id="search-options"
            >
              <option value="state">State / Country </option>
              <option value="airport_code">Airport Code</option>
            </select>
          </div>

          {/* input field */}
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

          <div className="col-sm-3" style={{ width: "10%" }}>
            <Button
              buttonType="submit"
              className="btn btn-primary"
              href="#stateDestinationMap"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
