import React from 'react'
import {Marker} from '@react-google-maps/api'

export default function SearchResult(props) {
    return (
        <div>
    <div >
    <div>
              <h1>{props.name}</h1>
              <p>Address: {props.location}</p>
              <p>Speed: {props.speed}</p>
              <p>Connection type: {props.connectorType}</p>
              <p>Price: {props.price}</p>
          
            </div>
    </div>
        </div>
    )
}
