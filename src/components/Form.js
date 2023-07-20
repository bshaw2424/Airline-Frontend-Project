import { useState } from "react";
import { unstable_HistoryRouter } from "react-router-dom";

export default function Form({
  value,
  airlineSearchSubmit,
  clearInputField,
  inputField,
}) {
  function keyDownEvent() {
    document.querySelector("#stateDestinationMap");
    let input = document.querySelector("#airportDataInput");
    let scrollPosition = input.value.length !== 0 ? 515 : null;
    if (inputField !== "airport_code") {
      window.scrollTo({ top: scrollPosition, behavior: "smooth" });
    }
  }
  const formScollStyle = {
    position: "sticky",
    top: 0,
    zIndex: 1,
    background: "#fff",
    width: "100%",
  };

  const none = {
    position: "static",
  };

  return (
    <div
      className="p-3 mb-1 shadow-sm"
      style={inputField === "airport_code" ? none : formScollStyle}
    >
      <form
        onSubmit={airlineSearchSubmit}
        className="py-2"
        style={{ width: "100%" }}
      >
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
          <div className="col-sm-3" style={{ width: "10%" }}>
            <button
              href="#stateDestinationMap"
              type="submit"
              className="btn btn-primary"
              onClick={() => keyDownEvent()}
              style={{ width: "100%" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
