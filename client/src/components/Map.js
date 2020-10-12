import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker
} from "@react-google-maps/api";
import * as ChargerData from "../data/data.json"
import mapStyles from "./mapStyles"






function Map() {
  
  const [charger, setSelectedCharger] = useState(null);
 console.log(ChargerData);
 const containerStyle = {
  width: "100vw",
  height: "100vh"
};
const center = {
  lat: 65.012093,
  lng: 25.465076
};
//  const input = (event) => {
//    if (event.target.value == "" || event.target.value == "0")
//    {
//      console.log('Nothing')
     
//    }
//    else {
//      location.map((place) => {
//        if (place.AddressInfo.Title.includes(event.target.value) || place.AddressInfo.AddressLine1.includes(event.target.value)) {
//          setSearchItem(place)
//          console.log(searchItem)
//        }
//      })
//    }
//    event.preventDefault();
//   }
  

  // function Search() {
  //   return (<input placeholder='Search a charger here' onChange={input} ></input> )
  // }
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDOduUSUYX6lFwhxQmx2b3yHifFBAwiHSw"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={mapStyles}
      >
        {/* <Marker key="123123" position={{lat:65.012093 , lng:25.465076}}/> */}
        { ChargerData.chargers.map((chargers) => {
          return <Marker 
          key={chargers.id} 
          position={{lat: chargers.lat, lng: chargers.lng}}
          onClick={() => {
            setSelectedCharger(chargers);
          }}
          />
        }) }
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
