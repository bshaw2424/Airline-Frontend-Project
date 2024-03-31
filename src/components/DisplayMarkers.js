import React, { useState } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

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

  return (
    <>
      {coords &&
        coords[airlineIndex] &&
        coords[airlineIndex].map((coordinates, index) => {
          const {
            location: { lat, lng, title },
          } = coordinates;
          return (
            <Marker
              key={`${title}-${index}`}
              position={{ lat: +lat, lng: +lng }}
              onMouseOver={() => handleMarkerHover(coordinates)}
              onMouseOut={handleCloseInfoWindow}
              onClick={() => handleMarkerClick(title)}
            >
              {selectedMarker === coordinates && (
                <InfoWindow
                  onCloseClick={handleCloseInfoWindow}
                  onMouseOver={handleInfoWindowHover}
                  onMouseOut={handleInfoWindowExit}
                >
                  <div>
                    <h5 className="text-center">{title}</h5>
                    <p>Click marker to view more details</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
    </>
  );
}
