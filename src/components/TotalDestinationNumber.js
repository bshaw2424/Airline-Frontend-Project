// import Breadcrumbs from "./Breadcrumbs";

export default function TotalDestinationNumber({
  totalFightDestinations,
  airlineDestinationTotal,
}) {
  return (
    <div className="justify-content-center align-items-center mt-xl-4">
      <h1
        onChange={airlineDestinationTotal}
        className="text-center"
        style={{ fontSize: "2.7rem" }}
      >
        {totalFightDestinations} Destination(s)
      </h1>
    </div>
  );
}
