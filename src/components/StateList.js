import React, { useState, useEffect } from "react";
import DisplayMarkers from "./DisplayMarkers";
import { axiosCallToLatitudeAndLongitudeCoordinates } from "./AirportAxiosQuery";
import {
  getUniqueListOfAirportCodes,
  changeAirportCodeToIcaoCode,
} from "../Utilities";
import StateMap from "./StateMap";
import AirlineMapList from "./AirlineMapList";

export default function StateList({
  dataList,
  searchValue,
  objectState,
  internationalSearchValue,
}) {
  const getListOfAirlinesObject = () =>
    dataList
      .map(state => ({
        name: state.name,
        codes: state.destinations
          .filter(location => location.state === searchValue)
          // reduce method is changed based on search is international or domestic
          .reduce((createObjectOfAirportCodeAndName, items) => {
            createObjectOfAirportCodeAndName.push({
              code:
                internationalSearchValue === "false"
                  ? changeAirportCodeToIcaoCode(items.airport_code)
                  : items.airport_code,
              // get name of airport
              airport: items.airport_name,
            });
            return createObjectOfAirportCodeAndName;
          }, []),
        length: state.destinations
          .filter(
            location =>
              location.state === searchValue &&
              location.international === internationalSearchValue,
          )
          .map(location => location.airport_code).length,
      }))
      .filter(listItem => listItem.codes.length !== 0);

  const [getActiveState, setActiveState] = useState(objectState);
  const [coords, setCoords] = useState();
  const [airlineNameList, setAirlineNameList] = useState();
  const [airlineObjectData, setAirlineObjectData] = useState(
    getListOfAirlinesObject(),
  );
  const [airlineIndex, setAirlineIndex] = useState();

  // axios api call to get data coordinates
  useEffect(() => {
    axiosCallToLatitudeAndLongitudeCoordinates(
      internationalSearchValue === "false" ? "icao" : "iata",
      searchValue,
    );
  }, [searchValue, internationalSearchValue]);

  // handles the state when to show list of airlines and markers when a airline is clicked
  const handleStateClick = airlineName => {
    setActiveState(prevState => ({
      ...Object.fromEntries(
        Object.entries(prevState).map(([key]) => [key, false]),
      ),
      [airlineName]: true,
    }));
    setAirlineIndex(getCoordinatesAndTitleToAddToMap(airlineName));
  };

  const getCoordinatesAndTitleToAddToMap = airlineName =>
    airlineNameList.findIndex(name => name === airlineName);

  useEffect(() => {
    // Update airlineObjectData when searchValue changes
    setAirlineObjectData(getListOfAirlinesObject());
    setAirlineIndex("");
    // remove highlighted , active airline in list
    setActiveState({});
  }, [searchValue]);

  // gets the index of the airline name that is clicked

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        // gets the unique airline codes for each airline search
        const dataResultsObjectWithNameAndCoordinates = await Promise.all(
          getUniqueListOfAirportCodes(airlineObjectData).map(
            async airportCode => {
              const getLatitudeLongitudeCoordinatesFromAPI =
                await axiosCallToLatitudeAndLongitudeCoordinates(
                  internationalSearchValue === "false" ? "icao" : "iata",
                  airportCode,
                );

              return {
                // gets airport code and coordinates with a latitude and longitude property
                name: airportCode,
                coordinates: getLatitudeLongitudeCoordinatesFromAPI,
              };
            },
          ),
        );

        // puts the lat and lng coordinates in a object
        const compareListToFindMatchingCodes = airlineObjectData.map(airline =>
          airline.codes.map(matchingName => {
            const findMatchingName =
              dataResultsObjectWithNameAndCoordinates.find(
                object => object.name === matchingName.code,
              );
            return findMatchingName
              ? {
                  location: {
                    ...findMatchingName?.coordinates,
                    title: matchingName?.airport,
                  },
                }
              : matchingName;
          }),
        );

        const getArrayListOfAirlineNames = airlineObjectData.map(a => a.name);
        setAirlineNameList(getArrayListOfAirlineNames);
        setCoords(compareListToFindMatchingCodes);
      } catch (error) {
        console.log("there was a error " + error);
      }
    };

    getCoordinates();
  }, [dataList, searchValue, airlineObjectData, internationalSearchValue]);

  return (
    <div className="d-flex flex-column flex-lg-row">
      <AirlineMapList
        airlineObjectData={airlineObjectData}
        activeStateWhenClicked={getActiveState}
        onClick={handleStateClick}
      />
      <StateMap displayMap={dataList} centerPointOfMap={searchValue}>
        <DisplayMarkers coords={coords} airlineIndex={airlineIndex} />
      </StateMap>
    </div>
  );
}
