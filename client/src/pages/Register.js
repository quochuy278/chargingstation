import React from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import constants from "../constants.json";

export default function Register() {
  const register = (event) => {
    event.preventDefault();
    axios
      .post(constants.baseAddress + "/register", {
        username: event.target["username"].value,
        password: event.target["password"].value
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={register} noValidate autoComplete="off">
        <Container maxWidth="sm">
          <TextField
            autoFocus
            margin="normal"
            label="Username"
            name="username"
            type="text"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
          />
        </Container>
        <Button type="submit" color="primary">
          Register
        </Button>
      </form>
      <Typography>
        or do you want to <Link to="/login">Login</Link>
      </Typography>
    </div>
  );
}
