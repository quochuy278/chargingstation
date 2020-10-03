import React,{useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AxiosClient from '../api/AxiosClient';
import * as chargerData from "../data/data.json"
const containerStyle = {
  width: '100vw',
  height: '100vh'
};
 
const center = {
  lat: 65.012093,
  lng: 25.465076
};



function Map() {
  
  const getData = ()=> {
    AxiosClient()
    .then((res)=>{
        console.log(res.data)

    })
    .catch((err)=> console.log(err))
}
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyDOduUSUYX6lFwhxQmx2b3yHifFBAwiHSw"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        getData={getData}
        
      >
        { Marker }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
 
export default React.memo(Map)

