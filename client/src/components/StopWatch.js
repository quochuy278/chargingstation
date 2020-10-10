import React, { Component } from "react";
import Button from "./Button";
import Display from "./Display";
export default class StopWatch extends Component {
  state = {
    time: { ms: 0, s: 48, m: 59, h: 0 },
    interv: null,
    status: 0
  };

  start = () => {
    this.run();
    this.setState({ status: 1 });
    this.setState({ interv: setInterval(this.run, 10) });
  };

  run = () => {
    console.log(this.state.time.ms);
    console.log(this.state.time.s);
    console.log(this.state.time.m);
    console.log(this.state.time.h);

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

  digit = Math.floor(1000 + Math.random() * 9000);

  random = (event) => {
    event.preventDefault();

    if (event.target["number"].value == this.digit) {
      console.log("thanh cong");
    } else {
      console.log(event.target["number"].value);
      console.log(this.digit);
    }
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <Display time={this.state.time} />
            <Button
              status={this.state.status}
              resume={this.resume}
              start={this.start}
              stop={this.stop}
              reset={this.reset}
            />
            <span>{this.digit}</span>
            <form onSubmit={this.random}>
              <input name="number"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
