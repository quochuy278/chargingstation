import React from "react";
import { Typography } from "@material-ui/core";
import { Marker } from "@react-google-maps/api";

export default function SearchResult(props) {
  return (
    <div>
      <Typography>{props.id}</Typography>
      <Typography>Name: {props.name}</Typography>
      <Typography>Address: {props.location}</Typography>
      <Typography>Status: {props.getStatus(props)}</Typography>
      <Typography>
        Speed: {props.speed} -{props.kW}kW
      </Typography>
      <Typography>Connection Type: {props.connectorType}</Typography>
      {!props.isAuthenticated ? (
        <Typography>Digit: {props.digit}</Typography>
      ) : (
        <Typography></Typography>
      )}
      <Typography>Price: {props.price}</Typography>
      <p>-----------------------------------------</p>
    </div>
  );
}
