export function getStates(airlineDestinationLocation) {
  const getLocationDestinations = airlineDestinationLocation.destinations.map(
    destinationStates => destinationStates.state,
  );
  const filterStates = [...new Set(getLocationDestinations)]
    .map(destinationLocationState => destinationLocationState)
    .sort();

  return filterStates;
}

export function getAirlineNames(airlineNames) {
  const getAllNamesOfAirlines = airlineNames.destinations
    .map(airline => airline)
    .sort();
  return getAllNamesOfAirlines;
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

export const airlineList = airlineArray => {
  return airlineArray.map(airline => airline.name);
};

export const filterAirlineCity = (airlineArray, category, airlineCity) =>
  airlineArray.destinations
    .filter(airline => airline[category] === airlineCity)
    .map(a => <>{a.name}</>).length;

export const findByState = (arr, category, targetValue) => {
  const airlineMap = new Map();
  const list = [];
  airlineMap.set(arr.name, filterAirlineCity(arr, category, targetValue));

  for (const [key, value] of airlineMap) {
    list.push({ name: key, value });
  }

  const filterList = list
    .filter(airline => airline.value !== 0)
    .map(airline => `${airline.name} - ${airline.value}`);
  return filterList;
};

export const findByCity = (arr, category, targetValue) => {
  const airlineMap = new Map();
  const list = [];
  airlineMap.set(arr.name, filterAirlineCity(arr, category, targetValue));

  for (const [key, value] of airlineMap) {
    list.push({ name: key, value });
  }
  const filterList = list
    .filter(airline => airline.value !== 0)
    .map(airline => `${airline.name}`);
  return filterList;
};

export const findByAirportCode = (arr, category, targetValue) => {
  // create a new Map
  const airlineMap = new Map();

  const airportCodeList = [];

  // set map to key/value pairs by airline and array of objects for the airport codes
  airlineMap.set(arr.name, filterAirlineCity(arr, category, targetValue));

  for (const [key, value] of airlineMap) {
    // pushes values to airportCodeList array
    airportCodeList.push({ name: key, value });
  }

  // return a filter list based on if the value is either a 0 or 1;
  return airportCodeList
    .filter(airline => airline.value !== 0)
    .map(airline => `${airline.name}`);
};
