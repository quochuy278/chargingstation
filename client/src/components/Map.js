import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker
} from "@react-google-maps/api";
// import * as ChargerData from "../data/data.json";
import mapStyles from "./MapStyles";

function Map(props) {
  const [charger, setSelectedCharger] = useState(null);
 
  const containerStyle = {
    width: "100%",
    height: "100vh"
  };
  const center = {
    lat: 65.012093,
    lng: 25.465076
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDOduUSUYX6lFwhxQmx2b3yHifFBAwiHSw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={mapStyles}
      >
        {/* <Marker key="123123" position={{lat:65.012093 , lng:25.465076}}/> */}
        {props.chargers.map((chargers) => {
          return (
            <Marker
              key={chargers.id}
              position={{ lat: chargers.lat, lng: chargers.lng }}
              onClick={() => {
                setSelectedCharger(chargers);
              }}
            />
          );
        })}
        {charger && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedCharger(null);
            }}
            position={{
              lat: charger.lat,
              lng: charger.lng
            }}
          >
            <div>
              <h1>{charger.name}</h1>
              <p>Address: {charger.location}</p>
              <p>Speed: {charger.speed}</p>
              <p>Connection type: {charger.connectorType}</p>
              <p>Price: {charger.price}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
export default React.memo(Map);

