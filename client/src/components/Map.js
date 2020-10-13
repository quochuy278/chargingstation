import React, { Component } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker
} from "@react-google-maps/api";

// function Map(props) {
//   console.log(props.chargers);
//   const [charger, setSelectedCharger] = useState(null);
//   const containerStyle = {
//     width: "100%",
//     height: "100vh"
//   };
//   const center = {
//     lat: 65.012093,
//     lng: 25.465076
//   };

//   return (
//     <LoadScript googleMapsApiKey="AIzaSyDOduUSUYX6lFwhxQmx2b3yHifFBAwiHSw">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={14}
//         options={mapStyles}
//       >
//         {/* <Marker key="123123" position={{lat:65.012093 , lng:25.465076}}/> */}
//         {ChargerData.chargers.map((chargers) => {
//           return (
//             <Marker
//               key={chargers.id}
//               position={{ lat: chargers.lat, lng: chargers.lng }}
//               onClick={() => {
//                 setSelectedCharger(chargers);
//               }}
//             />
//           );
//         })}
//         {charger && (
//           <InfoWindow
//             onCloseClick={() => {
//               setSelectedCharger(null);
//             }}
//             position={{
//               lat: charger.lat,
//               lng: charger.lng
//             }}
//           >
//             <div>
//               <h1>{charger.name}</h1>
//               <p>Address: {charger.location}</p>
//               <p>Speed: {charger.speed}</p>
//               <p>Connection type: {charger.connectorType}</p>
//               <p>Price: {charger.price}</p>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </LoadScript>
//   );
// }
// export default React.memo(Map);

// import React, { Component } from 'react'

export default class Map extends Component {
  state = {
    charger: null
  };
  center = {
    lat: 65.012093,
    lng: 25.465076
  };
  containerStyle = {
    width: "100%",
    height: "100vh"
  };
  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyDOduUSUYX6lFwhxQmx2b3yHifFBAwiHSw">
        <GoogleMap
          mapContainerStyle={this.containerStyle}
          center={this.center}
          zoom={14}
        >
          {this.props.chargers.map((spot) => {
            return (
              <Marker
                key={spot.id}
                position={{
                  lat: spot.lat,
                  lng: spot.lng
                }}
              />
            );
          })}
        </GoogleMap>
      </LoadScript>
    );
  }
}
