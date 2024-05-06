import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { getIataCodeFromIcaoCode } from "../Utilities";

export default function DisplayMarkers({ coords, airlineIndex }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isInfoWindowHovered, setIsInfoWindowHovered] = useState(false);

  const handleMarkerClick = title => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        title,
      )}`,
      "_blank",
    );
  };

  const handleMarkerHover = marker => {
    setSelectedMarker(marker);
  };

  const handleInfoWindowHover = () => {
    setIsInfoWindowHovered(true);
  };

  const handleInfoWindowExit = () => {
    setIsInfoWindowHovered(false);
  };

  const handleCloseInfoWindow = () => {
    if (!isInfoWindowHovered) {
      setSelectedMarker(null);
    }
  };
  console.log(airlineIndex);
  return (
    <>
      {coords &&
        coords[airlineIndex] &&
        coords[airlineIndex].map((airlineDetails, index) => {
          const { name, lat, lng, airport } = airlineDetails;

          return (
            <Marker
              key={`${airport}-${index}`}
              position={{
                lat: +lat,
                lng: +lng,
              }}
              onMouseOver={() => handleMarkerHover(airlineDetails)}
              // onMouseOut={handleCloseInfoWindow}
            >
              {!isInfoWindowHovered && selectedMarker === airlineDetails && (
                <InfoWindow
                  onCloseClick={handleCloseInfoWindow}
                  onMouseOver={handleInfoWindowHover}
                  onMouseOut={handleInfoWindowExit}
                  style={{ background: "tan", height: "40rem", width: "60rem" }}
                >
                  <>
                    <h4 className="text-center">{airport}</h4>
                    <p
                      className="text-center bg-primary py-2 text-white"
                      style={{ fontSize: "1.3rem" }}
                    >
                      <b>( {getIataCodeFromIcaoCode(name)} )</b>
                    </p>
                    <p
                      className="text-center mt-0 pt-0"
                      style={{
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleMarkerClick(airport)}
                    >
                      Click marker to view more details
                    </p>
                  </>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
    </>
  );
}
