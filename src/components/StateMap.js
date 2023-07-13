import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { stateAndCountryCoordinates } from "./StateCountryArrays";

export default function StateMap({ displayMap, centerPointOfMap }) {
  const filterfromUserInputToGetCoordinates = stateAndCountryCoordinates.filter(
    a => a.name === centerPointOfMap,
  );

  // get the center point of input State/Country
  const centerOFMapCoordinates = {
    lat: filterfromUserInputToGetCoordinates[0].lat,
    lng: filterfromUserInputToGetCoordinates[0].lng,
  };

  const containerStyle = {
    width: "900px",
    height: "500px",
  };

  const pdx = {
    lat: 45.5883,
    lng: -122.5944,
  };

  const eug = {
    lat: 44.1218,
    lng: -123.2159,
  };

  const API_KEY = process.env.GOOGLE_MAP_KEY;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  return isLoaded ? (
    <div
      style={{
        maxWidth: "100%",
        height: "100%",
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerOFMapCoordinates}
        zoom={6}
        options={{
          zoomControl: false,
          streetView: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        <Marker position={pdx} />
        {/* <Marker position={eug} /> */}
      </GoogleMap>
    </div>
  ) : (
    <>...loading</>
  );
}
