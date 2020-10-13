import React, { Component } from "react";
import Map from "../components/Map";
import { Grid, Box } from "@material-ui/core";
import List from "../components/List";
import StopWatch from "../components/StopWatch";

// export default function Location() {
//   return (
//     <div>
//       <Map></Map>
//       <List />
//     </div>
//   );

export default class Location extends Component {
  state = {
    chargers: [],
    time: { ms: 0, s: 0, m: 0, h: 0 },
    interv: null,
    status: 0,
    selectedId: null,
    totalPrice: 0
  };

  // getData = () => {
  //   getMaps()
  //     .then((res) => {
  //       this.setState({ items: res.data });
  //     })
  //     .catch((error) => console.log(error));
  // };

  start = () => {
    this.run();
    this.setState({ status: 1 });
    this.setState({ interv: setInterval(this.run, 10) });
  };

  run = () => {
    var updatedMs = this.state.time.ms,
      updatedS = this.state.time.s,
      updatedM = this.state.time.m,
      updatedH = this.state.time.h;
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }

    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }

    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }

    updatedMs++;

    return this.setState({
      time: {
        ms: updatedMs,
        s: updatedS,
        m: updatedM,
        h: updatedH
      }
    });
  };

  reset = () => {
    clearInterval(this.state.interv);
    this.setState({ status: 0 });
    this.setState({ time: { ms: 0, s: 0, m: 0, h: 0 } });
  };

  stop = () => {
    clearInterval(this.state.interv);
    this.setState({ status: 2 });
  };

  resume = () => this.start();

  // random = (event) => {
  //   event.preventDefault();
  //   if (event.target["number"].value == this.state.digit) {
  //     this.setState({ confirm: true });
  //   } else {
  //     this.setState({
  //       digit: Math.floor(1000 + Math.random() * 9000)
  //     });
  //   }
  // };

  render() {
    return (
      <div>
        {!this.state.isAuthenticated ? (
          <Grid container>
            <Grid item md={3}>
              <Box css={{ height: "50vh", overflow: "auto" }}>
                <List></List>
              </Box>
              <Box>
                <StopWatch
                  time={this.state.time}
                  interv={this.state.interv}
                  status={this.state.status}
                  start={this.start}
                  run={this.run}
                  stop={this.stop}
                  reset={this.reset}
                  resume={this.resume}
                  random={this.random}
                ></StopWatch>
              </Box>
            </Grid>
            <Grid item md={9}>
              <Map></Map>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item md={3}>
              <Box css={{ height: "100vh", overflow: "auto" }}>
                <List></List>
              </Box>
            </Grid>
            <Grid item md={9}>
              <Map></Map>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}
