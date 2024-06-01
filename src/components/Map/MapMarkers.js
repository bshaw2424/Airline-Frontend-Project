// import { useEffect, useState } from "react";

// import { MarkerF } from "@react-google-maps/api";
// import {
//   changeAirportCodeToIcaoCode,
//   getUniqueListOfAirportCodes,
//   axiosCallToLatitudeAndLongitudeCoordinates,
// } from "../Utilities";

// export default function MapMarkers({ displayMap, mapCenterPoint }) {
//   const [coords, setCoords] = useState([]);

//   // axios call
//   useEffect(() => {
//     axiosCallToLatitudeAndLongitudeCoordinates(mapCenterPoint);
//   }, [mapCenterPoint]);

//   useEffect(() => {
//     const getListOfDestinationCoordinatesToDisplayOnMap =
//       async searchBybooleanValueForInternationalOrDomesticLocations => {
//         try {
//           //
//           const getArrayOfAirportCodes = displayMap.map(location =>
//             location.destinations
//               .filter(
//                 // filter where the destination of state is equal to user input and is not international
//                 destination =>
//                   destination.state === mapCenterPoint &&
//                   destination.international ===
//                     searchBybooleanValueForInternationalOrDomesticLocations,
//               )
//               .map(destination => {
//                 // gets the filtered airport codes results and changes them into icao codes instead of iata
//                 const { airport_code } = destination;
//                 return changeAirportCodeToIcaoCode(airport_code);
//               }),
//           );

//           const dataResultsObjectWithNameAndCoordinates = await Promise.all(
//             getUniqueListOfAirportCodes(getArrayOfAirportCodes).map(
//               async locationNameAndCoordinates => {
//                 const getLatitudeLongitudeCoordinatesFromAPI =
//                   await axiosCallToLatitudeAndLongitudeCoordinates(
//                     locationNameAndCoordinates,
//                   );

//                 return {
//                   name: locationNameAndCoordinates,
//                   coordinates: getLatitudeLongitudeCoordinatesFromAPI,
//                 };
//               },
//             ),
//           );

//           const coordinates = getArrayOfAirportCodes.map(code => {
//             return code.map(coord => coord);
//           });

//           // puts the lat and lng coordinates in a object
//           const compareListToFindMatchingCodes = coordinates.map(coords =>
//             coords.map(matchingName => {
//               const findMatchingName =
//                 dataResultsObjectWithNameAndCoordinates.find(
//                   object => object.name === matchingName,
//                 );
//               return findMatchingName
//                 ? findMatchingName.coordinates
//                 : matchingName;
//             }),
//           );

//           setCoords(compareListToFindMatchingCodes);

//           // Assuming setStateLocation is a state-setting function
//         } catch (error) {
//           console.log("there was a error " + error);
//         }
//       };

//     getListOfDestinationCoordinatesToDisplayOnMap("false");
//   }, [displayMap, mapCenterPoint, setCoords]);

//   const displayLocationMapMarkers = coords.map(getCoordinatesForMapMarkers => {
//     return getCoordinatesForMapMarkers.map(
//       (latitudeLongitudeCoordinates, index) => {
//         const { lat, lng } = latitudeLongitudeCoordinates;
//         return (
//           <MarkerF
//             // convert the lat and lng coordinates from a string to a number to use Google Maps Markers

//             position={{
//               lat: +lat,
//               lng: +lng,
//               title: "Hello World!!",
//             }}
//           />
//         );
//       },
//     );
//   });

//   return <>{displayLocationMapMarkers}</>;
// }
