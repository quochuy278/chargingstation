import React from "react";
import Buttons from "./Buttons";
import Display from "./Display";
import { Container, Button, Box } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

export default function StopWatch(props) {
  {
    if (props.isAuthenticated) {
      if (props.confirm) {
        return (
          <div>
            <Container m={6}>
              <Box m={3}>
                <Display time={props.time} />
                <Buttons
                  status={props.status}
                  resume={props.resume}
                  start={props.start}
                  stop={props.stop}
                />
              </Box>
              {props.status == 2 ? (
                <Box m={3}>
                  <Button>
                    <Link to="/total">Next</Link>
                  </Button>
                </Box>
              ) : (
                <div></div>
              )}
            </Container>
          </div>
        );
      } else {
        alert("Please type the digit");
        return <Redirect to="/location" />;
      }
    } else {
      alert("Please login");
      return <Redirect to="/login" />;
    }
  }
}
