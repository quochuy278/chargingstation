import React from "react";
import Buttons from "./Buttons";
import Display from "./Display";
import { Container } from "@material-ui/core";

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
        </Container>
      ) : (
        <Container>
          {/* <b>{props.digit}</b>
          <form onSubmit={props.random}>
            <input name="number"></input>
          </form> */}
        </Container>
      )}
    </div>
  );
}
