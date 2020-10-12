import React from "react";
import { Button } from "@material-ui/core";

export default function Buttons(props) {
  return (
    <div>
      {props.status === 0 ? <Button onClick={props.start}>Start</Button> : ""}

      {props.status === 1 ? (
        <div>
          <Button onClick={props.stop}>Stop</Button>
          <Button onClick={props.reset}>Reset</Button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <Button onClick={props.resume}>Resume</Button>
          <Button onClick={props.reset}>Reset</Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
