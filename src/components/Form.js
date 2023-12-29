import AirlineQuickSearch from "./AirlineQuickSearch";

import Button from "./Button";
import SelectMenu from "./SelectMenu";

export default function Form({
  onSubmit,
  airlineLinks,
  handleOptionChange,
  formValue,
  formChange,
}) {
  return (
    <>
      <div
        className="p-3 mb-1 shadow-sm"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "rgba(255,255,255, 0.6)",
        }}
      >
        <form onSubmit={onSubmit} className="py-2">
          <div className="row d-flex justify-content-center">
            {/* select dropdown menu to choose between state or airport code */}
            <SelectMenu onChange={handleOptionChange} />
            <AirlineQuickSearch value={formValue} onChange={formChange} />
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
    </>
  );
}
