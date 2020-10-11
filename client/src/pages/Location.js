import React from "react";
import Map from "../components/Map";
import { Grid } from "@material-ui/core";
import List from "../components/List";

export default function Location(props) {
  return (
    <div>
      {console.log(props.isAuthenticated)}
      {props.isAuthenticated ? (
        <Grid container>
          <Grid item md={3}></Grid>
          <Grid item md={9}>
            <Map></Map>
          </Grid>
        </Grid>
      ) : (
        <Map></Map>
      )}
    </div>
  );
}
