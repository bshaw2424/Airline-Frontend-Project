import { upperCaseFirstLetterOfWord } from "../Utilities";
export default function DisplayAirportCodeTitle({
  selectOption,
  airlineAirportLength,
  airportFormValue,
  airportName,
}) {
  return (
    <div className="text-center pb-2">
      <h2 className="mt-3 w-100 fs-1">
        {`${airlineAirportLength} out of 10 airlines fly to `}
        {selectOption === "airport_code" && airlineAirportLength !== 0
          ? airportFormValue.toUpperCase()
          : upperCaseFirstLetterOfWord(airportFormValue)}
        {selectOption === "airport_code" ? ` - ${airportName}` : ""}
      </h2>
    </div>
  );
}
