import React from "react";
import { Typography } from "@material-ui/core";

export default function SearchResult(props) {
  return (
    <div>
      <Typography>{props.name}</Typography>
      <Typography>Address: {props.location}</Typography>
      <Typography>Speed: {props.speed}</Typography>
      <Typography>Connection type: {props.connectorType}</Typography>
      <Typography>Price: {props.price}</Typography>
      <p>-----------------------------------------</p>
    </div>
  );
}
