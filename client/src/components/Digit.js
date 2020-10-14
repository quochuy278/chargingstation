import React from "react";
import { Container, Button, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  typo: {
    color: theme.palette.error.light
  }
}));
export default function Digit(props) {
  const classes = useStyles();
  return (
    <Container>
      <form onSubmit={props.verify} id="my-form">
        {!props.confirm ? (
          <TextField
            inputProps={{ maxLength: 4 }}
            label="Type your digit"
            name="digit"
          ></TextField>
        ) : (
          <TextField
            inputProps={{ maxLength: 4 }}
            label="Type your digit"
            name="digit"
            disabled
          ></TextField>
        )}
      </form>
      {!props.confirm ? (
        <Typography className={classes.typo} variant="caption">
          You need to enter for the next step
        </Typography>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
