export function getStates(airlineDestinationLocation) {
  const getLocationDestinations = airlineDestinationLocation.destinations.map(
    destinationStates => destinationStates.state,
  );
  const filterStates = [...new Set(getLocationDestinations)]
    .map(destinationLocationState => destinationLocationState)
    .sort();

  return filterStates;
}

export function airlineNamesForDropdownList(airlineNames) {
  const getAirlineNames = airlineNames.map(airline => (
    <a
      key={airline._id}
      href={`/airlines/${airline.slug}`}
      className="dropdown-item"
    >
      {airline.name}
    </a>
  ));
  return getAirlineNames;
}

export const getNumbers = airlines => airlines.map(a => a.destinations.length);

export const getLengthOfAirlineDestinations = (
  e,
  airline,
  stateLocation,
  main,
) => {
  const getAirlineDestinationsLengths = airline
    .filter(
      names =>
        names.slug === e.target.innerText.replace(/ /g, "-").toLowerCase(),
    )
    .map(
      airlineDestinationsLength =>
        airlineDestinationsLength.destinations.length,
    );
  stateLocation(getAirlineDestinationsLengths);
  main(true);
};
