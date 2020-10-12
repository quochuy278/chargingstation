import React from "react";
import Map from "../components/Map";
import { Grid } from "@material-ui/core";
import List from "../components/List";

export default function Location() {
  return (
    <div>    
        <Map></Map>
        <List/>
    </div>
  );
}
