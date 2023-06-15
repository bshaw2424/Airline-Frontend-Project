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

const createFilteredDataList = (name, value) => {
  const dataList = [{ name, value }];
  return dataList.filter(airline => airline.value !== 0);
};

export const getLengthOfAirlineCategory = (
  airlineArray,
  category,
  airlineCity,
) =>
  airlineArray.destinations
    .filter(airline => airline[category] === airlineCity)
    .map(a => a.name).length;

export const getFilteredAirportCodeOrCity = (arr, category, targetValue) => {
  const filteredData = getLengthOfAirlineCategory(arr, category, targetValue);

  return createFilteredDataList(arr.name, filteredData).map(airline => (
    <section>
      <div
        style={{ marginBottom: ".75rem" }}
        key={airline._id}
        className="text-center"
      >
        {airline.name}
      </div>
    </section>
  ));
};

export const getFilteredDataByState = (arr, category, targetValue) => {
  const filterByState = getLengthOfAirlineCategory(arr, category, targetValue);
  return createFilteredDataList(arr.name, filterByState).map(airline => (
    <section>
      <div
        style={{
          marginBottom: ".75rem",
        }}
        className="text-center"
        key={airline._id}
      >
        {airline.name} - {airline.value}*
      </div>
    </section>
  ));
};

export const displayMessageIfSearchInputNotFound = (
  airlineArray,
  airlineCategory,
  userInputValue,
) => {
  return airlineArray.map(getAirline =>
    // find user input if some of the items in the array are true
    getAirline.destinations.some(
      inputFormValue =>
        // find by airline category ie [state, city, airport code] by uppercase or first letter captial
        inputFormValue[airlineCategory] ===
          upperCaseFirstLetterOfWord(userInputValue) ||
        inputFormValue[airlineCategory] === userInputValue.toUpperCase(),
    ),
  );
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

export const getNumberLengthOfSearch = (
  airlines,
  searchCategory,
  searchInput,
) =>
  displayMessageIfSearchInputNotFound(
    airlines,
    searchCategory,
    searchInput,
  ).filter(airlineInArray => airlineInArray === true).length;

export const getCitiesDestinationsList = (cityArray, userTargetTextValue) => {
  const cities = cityArray
    .map(airline =>
      airline.destinations.map(destination => ({
        city: destination.city.trim(),
        state: destination.state,
      })),
    )
    .flat();

  const uniqueCities = [];

  return cities
    .filter(a => a.city === userTargetTextValue)
    .map(a => {
      const cityState = `${a.city} - ( ${a.state} )`;
      if (!uniqueCities.includes(cityState)) {
        uniqueCities.push(cityState);
        return <div key={cityState}>{cityState}</div>;
      }
      return null;
    });
};

export const turnDatabaseStringIntoBoolean = stringValue =>
  Boolean(stringValue);

export const getNameOfAirportFromAirportCodeInput = (airline, airportCode) => {
  const getDest = airline.map(a =>
    a.destinations
      .filter(a => a.airport_code === airportCode)
      .map(a => a.airport_name),
  );

  const getAirportName = getDest.reduce((airlineArray, currentAirportName) => {
    for (let airportName of currentAirportName) {
      if (!airlineArray.includes(airportName)) {
        airlineArray.push(airportName);
      }
    }

    return airlineArray;
  }, []);
  console.log(getAirportName);
  return getAirportName[1] || getAirportName[0];
};
