import React from "react";
import { Button, TextField, Container } from "@material-ui/core";
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
        props.loginSuccess();
        props.history.push(props.redirectPathOnSuccess);
      })
      .catch(() => {
        props.loginFail();
      });
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={login}>
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
      <Button>
        <Link to="/register">Register</Link>
      </Button>
    </div>
  );
}
