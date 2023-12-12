import AirlineQuickSearch from "./AirlineQuickSearch";

import Button from "./Button";
import SelectMenu from "./SelectMenu";

export default function Form({ onSubmit, onChange, value }) {
  return (
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
          <SelectMenu />
          <AirlineQuickSearch value={value} onChange={onChange} />
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
