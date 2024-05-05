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
  const getAirportCodes = dataList.map(a =>
    a.destinations
      .filter(item => item.state === searchValue)
      .map(
        item =>
          item.length !== 0 && {
            airport: item.airport_name,
            code: item.airport_code,
          },
      ),
  );
  const filteredCodes = getAirportCodes.filter(item => item.length !== 0);

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
              // // get name of airport
              // airport: items.airport_name,
            });
            return createObjectOfAirportCodeAndName;
          }, []),
        airport_details: filteredCodes,
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
    // Check if airlineNameList is defined before calling findIndex
    if (airlineNameList) {
      setAirlineIndex(getCoordinatesAndTitleToAddToMap(airlineName));
    }
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
        console.log(dataResultsObjectWithNameAndCoordinates);
        // puts the lat and lng coordinates in a object
        const compareListToFindMatchingCodes = airlineObjectData.map(
          (airline, j) => {
            const destinationCoordinates = airline.codes.map(matchingName => {
              return dataResultsObjectWithNameAndCoordinates.find(
                object => object.name === matchingName.code,
              );
            });

            const airportMarkerDetails = airline.airport_details.map(a => {
              let obj = {};
              for (let i = 0; i < a.length; i++) {
                obj["coordinates"] = destinationCoordinates[i];
                obj["airport"] = a[i].airport;
                obj["code"] = a[i].code;
              }

              return obj;
            });
            return { ...destinationCoordinates, ...airportMarkerDetails };
          },
        );
        console.log(compareListToFindMatchingCodes);
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
