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
  const searchBarStyles = {
    position: "sticky",
    top: 0,
    zIndex: 2,
    background: "rgba(255,255,255, 0.6)",
  };
  return (
    <>
      <section
        className="py-3 py-sm-0 py-lg-3 mb-1 shadow-sm"
        style={searchBarStyles}
      >
        <form onSubmit={onSubmit} className="container py-2 py-sm-0 w-100">
          <div className="d-lg-flex">
            <div className="d-lg-flex w-100">
              <SelectMenu onChange={handleOptionChange} />
              <AirlineQuickSearch value={formValue} onChange={formChange} />
            </div>
            <div className="w-100 d-flex flex-sm-column flex-lg-row justify-content-lg-end">
              <Button
                buttonType="submit"
                className="btn btn-primary w-100 ms-sm-1 ms-sm-0 ms-lg-5 mt-3 mt-sm-3 mt-lg-0"
                href="#stateDestinationMap"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
