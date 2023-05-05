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
    .map(a => a.name).length;

export const getFilteredAirportCodeOrCity = (arr, category, targetValue) => {
  const airlineDataMap = new Map();
  const dataList = [];

  airlineDataMap.set(arr.name, filterAirlineCity(arr, category, targetValue));

  console.log([[arr.name]]);
  for (const [key, value] of airlineDataMap) {
    dataList.push({ name: key, value });
  }

  return dataList
    .filter(airline => airline.value !== 0)
    .map(airline => airline.name);
};

export const getFilteredDataByState = (arr, category, targetValue) => {
  const airlineMap = new Map();

  const list = [];
  airlineMap.set(arr.name, filterAirlineCity(arr, category, targetValue));

  for (const [key, value] of airlineMap) {
    list.push({ name: key, value });
  }

  return list
    .filter(airline => airline.value !== 0)
    .map(airline => `${airline.name} - ${airline.value}`);
};

export const upperCaseFirstLetterOfWord = wordToChangeFirstLetter => {
  const splitWordsAtEmptySpace = wordToChangeFirstLetter.split(" ");

  let combinedString = "";

  for (let i = 0; i < splitWordsAtEmptySpace.length; i++) {
    // get the first letter of word and captialize it
    const getFirstLetterOfWord = splitWordsAtEmptySpace[i]
      .charAt(0)
      .toUpperCase();

    // slice at index first letter to get the rest of the word minus the first letter
    let getRestOfWord = splitWordsAtEmptySpace[i].slice(1);

    if (getRestOfWord.toUpperCase()) {
      getRestOfWord = getRestOfWord.toLowerCase();
    }
    // combine the captial letter with the rest of the word
    combinedString += `${getFirstLetterOfWord}${getRestOfWord} `;
  }
  // return combine word and erase and leading or trailing spaces using trim
  return combinedString.trim();
};
