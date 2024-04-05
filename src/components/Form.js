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
        className="p-3  mb-1 shadow-sm container justify-content-center align-items-center"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "rgba(255,255,255, 0.6)",
        }}
      >
        <form onSubmit={onSubmit} className="py-2">
          <div className="row d-flex flex-xl-column">
            <div className="d-lg-flex  flex-lg-row justify-content-between align-items-lg-center justify-content-lg-between flex-sm-column">
              <SelectMenu onChange={handleOptionChange} />
              <AirlineQuickSearch value={formValue} onChange={formChange} />
            </div>
            <div className="d-flex w-sm-100 w-lg-100 mt-2 mt-sm-2 mt-lg-4 align-items-center justify-content-center">
              <Button
                buttonType="submit"
                className="btn btn-primary w-50"
                href="#stateDestinationMap"
                style={{ width: "75%" }}
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
