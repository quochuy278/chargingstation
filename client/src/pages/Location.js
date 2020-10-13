import React, { Component } from "react";
import Map from "../components/Map";
import { Grid, Box } from "@material-ui/core";
import List from "../components/List";
import StopWatch from "../components/StopWatch";

export default class Location extends Component {
  state = {
    time: { ms: 0, s: 0, m: 50, h: 0 },
    interv: null,
    status: 0,
    selectedId: null,
    totalPrice: 0,
    confirm: false,
    selectedCharger: null
  };

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

  verify = (event) => {
    event.preventDefault();
    const fil = this.props.chargers.map((charger) => charger.digit);
    if (fil.includes(Number(event.target["digit"].value))) {
      let a = this.props.chargers.filter(
        (charger) => charger.digit == Number(event.target["digit"].value)
      );
      console.log(a[0]);
      if (a[0].status) {
        this.setState({ confirm: true });
        this.price();
      }
      this.setState({ selectedCharger: a });
    }
  };

  price = (event) => {
    let total = 0;
    let kw = this.state.selectedCharger[0].kW;
    let price = this.state.selectedCharger[0].price;

    if (this.state.selectedCharger[0].speed == "Slow") {
      total =
        price *
        (this.state.time.h * 60 + this.state.time.m + this.state.time.s / 60);
      console.log(total);
    } else {
      total =
        price *
        kw *
        (this.state.time.h + this.state.time.m / 60 + this.state.time.s / 3600);
      console.log(this.state.time.h);
    }
    this.setState({ totalPrice: price });
  };

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
                  verify={this.verify}
                  confirm={this.state.confirm}
                  price={this.price}
                ></StopWatch>
              </Box>
            </Grid>
            <Grid item md={9}>
              <Map chargers={this.props.chargers}></Map>
            </Grid>
          </Grid>
        ) : (
          <Grid container>
            <Grid item md={3}>
              <Box css={{ height: "100vh", overflow: "auto" }}>
                <List></List>
              </Box>
              <Box></Box>
            </Grid>
            <Grid item md={9}>
              <Map chargers={this.props.chargers}></Map>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}
