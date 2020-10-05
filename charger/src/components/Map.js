import React,{useState,useEffect} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getMaps } from '../api/AxiosClient'
const containerStyle = {
  width: '100vw',
  height: '100vh'
};
 
const center = {
  lat: 65.012093,
  lng: 25.465076
};



function Map() {
  const [data , setData] = useState([])
  const getData = ()=> {
    getMaps()
    .then((res)=>{
        console.log(res.data)
        setData(res.data)
    })
    .catch((err)=> console.log(err))
}
useEffect(() => {
  getData();
}, []);
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDOduUSUYX6lFwhxQmx2b3yHifFBAwiHSw"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* <Marker position={{lat:65.012093, lng:25.465076 }} /> */}
       {data.map((charger) => {
        return <Marker key={charger.AddressInfo.ID} 
                 position={{
                   lat: charger.AddressInfo.Latitude,
                   lng: charger.AddressInfo.Longitude,
        }}/>
       })}
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(Map)

