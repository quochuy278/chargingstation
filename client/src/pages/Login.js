import React from "react";
import { Button, TextField, Container, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Auth from "../components/Auth";

export default function Login(props) {
  const login = (event) => {
    event.preventDefault();

    Auth.authenticate(
      event.target["username"].value,
      event.target["password"].value
    )
      .then((result) => {
        console.log("login" + result);
        props.loginSuccess();
      })
      .catch((err) => {
        props.loginFail();
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={login} noValidate autoComplete="off">
        <Container>
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
          Login
        </Button>
      </form>
      <Typography>
        or do you want to <Link to="/register"> register</Link>
      </Typography>
    </div>
  );
}
