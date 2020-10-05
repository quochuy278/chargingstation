<<<<<<< HEAD
import React,{useState,useEffect} from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { getMaps } from '../api/AxiosClient'
import MapStyles from '../components/MapStyles'
const containerStyle = {
  width: '100vw',
  height: '100vh'
};
 
=======
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

<<<<<<<< HEAD:charger/src/pages/Location.js
import React from 'react'
import Map from '../components/Map'

export default function Location() {
  return (
    <Map />
  )
}

========
const containerStyle = {
  width: "70%",
  height: "600px"
};

>>>>>>> master
const center = {
  lat: 65.012093,
  lng: 25.465076
};

<<<<<<< HEAD


function Map() {
  const [location , setLocation] = useState([])
  const [charger,setSelectedCharger] = useState(null);

  const getData = ()=> {
    getMaps()
    .then((res)=>{
        console.log(res.data)
        setLocation(res.data)
    })
    .catch((err)=> console.log(err))
}



useEffect(() => {
  getData();
}, []);


console.log(location)
 
return (
    <LoadScript
      googleMapsApiKey="AIzaSyDOduUSUYX6lFwhxQmx2b3yHifFBAwiHSw"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={{styles: MapStyles}}
      >
        {/* <Marker position={{lat:65.012093, lng:25.465076 }} /> */}
        
       {location.map((items) => {
        return <Marker key={items.AddressInfo.ID} 
                 position={{
                   lat: items.AddressInfo.Latitude,
                   lng: items.AddressInfo.Longitude,
        }}
              onClick={()=> {
                setSelectedCharger(items);
              }}
              icon={{
                url: '/charger.png',
                scaledSize: new window.google.maps.Size(25, 25)
              }}
        />
       })}
       {charger && (<InfoWindow 
        onCloseClick={()=> {
          setSelectedCharger(null);
        }}
         position={{lat: charger.AddressInfo.Latitude,
                   lng: charger.AddressInfo.Longitude}}
        >

         <div>
         <h1>{charger.AddressInfo.Title}</h1>
         <p>Address: {charger.AddressInfo.AddressLine1}</p>
         <p>Charger available: {charger.NumberOfPoints}</p>
         </div>
       </InfoWindow>)}
       
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(Map)

=======
function Map() {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return (
    <LoadScript googleMapsApiKey="" /*API key vao day */>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(Map);
>>>>>>>> master:client/src/components/Map.js
>>>>>>> master
