export function getStates(airlineDestinationLocation) {
  const getLocationDestinations = airlineDestinationLocation.destinations.map(
    destinationStates => destinationStates.state,
  );
  const filterStates = [...new Set(getLocationDestinations)]
    .map(state => state)
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

//   const airlineNameDropdownList = airline.map(airlines => (
//     <li>
//       <a
//         key={airline._id}
//         className="dropdown-item"
//         href={`/airlines/${airlines.slug}`}
//       >
//         {airlines.name}
//       </a>
//     </li>
