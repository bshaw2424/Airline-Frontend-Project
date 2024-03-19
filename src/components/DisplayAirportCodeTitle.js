import { upperCaseFirstLetterOfWord } from "../Utilities";
export default function DisplayAirportCodeTitle({
  selectOption,
  airlineAirportLength,
  airportFormValue,
  airportName,
}) {
  return (
    <div className="text-center pb-3">
      <h2 className=" mt-3 " style={{ width: "100%" }}>
        {`${airlineAirportLength} out of 10 airlines fly to `}
        {selectOption === "airport_code" && airlineAirportLength !== 0
          ? airportFormValue.toUpperCase()
          : upperCaseFirstLetterOfWord(airportFormValue)}
        {selectOption === "airport_code" ? ` - ${airportName}` : ""}
      </h2>
      <small>
        ( <b>*</b> Number of destinations within state / country )
      </small>
    </div>
  );
}
