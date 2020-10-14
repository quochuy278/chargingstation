import React from "react";
import { Grid, Box } from "@material-ui/core";
import List from "../components/List";
import Digit from "../components/Digit";
import Map from "../components/Map";
import StopWatch from "../components/StopWatch";

export default function Location(props) {
  return (
    <div>
      {props.isAuthenticated ? (
        <Grid container>
          <Grid item md={3}>
            <Box p={4} css={{ height: "60vh", overflow: "auto" }}>
              <List
                chargers={props.chargers}
                isAuthenticated={props.isAuthenticated}
              ></List>
            </Box>
            <Box p={6}>
              <Digit
                verify={props.verify}
                selectedCharger={props.selectedCharger}
                confirm={props.confirm}
              ></Digit>
              {props.confirm ? (
                <StopWatch
                  isAuthenticated={props.isAuthenticated}
                  time={props.time}
                  interv={props.interv}
                  status={props.status}
                  start={props.start}
                  run={props.run}
                  stop={props.stop}
                  reset={props.reset}
                  resume={props.resume}
                  confirm={props.confirm}
                  selectedCharger={props.selectedCharger}
                ></StopWatch>
              ) : (
                <div></div>
              )}
            </Box>
          </Grid>
          <Grid item md={9}>
            <Map chargers={props.chargers}></Map>
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <Grid item md={3}>
            <Box css={{ height: "100vh", overflow: "auto" }}>
              <List chargers={props.chargers}></List>
            </Box>
            <Box></Box>
          </Grid>
          <Grid item md={9}>
            <Map chargers={props.chargers}></Map>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
