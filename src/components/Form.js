import { useState } from "react";
import AirlineQuickSearch from "./AirlineQuickSearch";

import Button from "./Button";
import SelectMenu from "./SelectMenu";
import AirlineStateSearch from "./AirlineStateSearch";

export default function Form({ onSubmit, airlineLinks, state }) {
  const [formValue, setFormValue] = useState("");
  const [selectOption, setSelectOption] = useState();

  function handleOptionChange(e) {
    setSelectOption(e.target.value);
  }
  function formChange(e) {
    setFormValue(e.target.value);
  }
  return (
    <>
      <div
        className="p-3 mb-1 shadow-sm"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "#fff",
        }}
      >
        <form onSubmit={onSubmit} className="py-2">
          <div className="row d-flex justify-content-center">
            {/* select dropdown menu to choose between state or airport code */}
            <SelectMenu onChange={e => handleOptionChange(e)} />
            <AirlineQuickSearch
              value={formValue}
              onChange={e => formChange(e)}
            />
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
      {airlineLinks}
      {selectOption === "state" && state}
    </>
  );
}
