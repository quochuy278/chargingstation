import React from "react";
import Buttons from "./Buttons";
import Display from "./Display";
import { Container } from "@material-ui/core";
import Price from "./Price";

export default function StopWatch(props) {
  return (
    <div>
      {props.confirm ? (
        <Container>
          <Display time={props.time} />
          <Buttons
            status={props.status}
            resume={props.resume}
            start={props.start}
            stop={props.stop}
            reset={props.reset}
          />
          <form onSubmit={props.price}>
            <input></input>
          </form>
        </Container>
      ) : (
        <Container>
          <form onSubmit={props.verify}>
            <input name="digit"></input>
          </form>
        </Container>
      )}
    </div>
  );
}
