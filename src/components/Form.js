import AirlineQuickSearch from "./AirlineQuickSearch";

import Button from "./Button";
import SelectMenu from "./SelectMenu";

export default function Form({
  onSubmit,
  handleOptionChange,
  formValue,
  formChange,
  show,
}) {
  return (
    <>
      <div
        className="p-3 mb-1 shadow-sm"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "rgba(255,255,255, 0.6)",
        }}
      >
        <form onSubmit={onSubmit} className="py-2">
          <div className="row d-flex justify-content-center">
            {/* select dropdown menu to choose between state, international, or airport code */}
            <SelectMenu onChange={handleOptionChange} />
            <AirlineQuickSearch value={formValue} onChange={formChange} />
            <div className="col-sm-3 w-sm-100 w-xl-10 mt-2 mt-sm-2">
              <Button
                buttonType="submit"
                className="btn btn-primary w-100"
                href="#stateDestinationMap"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
