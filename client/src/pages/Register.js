import React from "react";
import { Button, Container, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Register(props) {
  return (
    <div>
      <form noValidate autoComplete="off">
        <Container>
          <TextField
            autoFocus
            margin="normal"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            fullWidth
          />
        </Container>
        <Button type="submit" color="primary">
          Register
        </Button>
      </form>
      <Button>
        <Link to="/login">Login</Link>
      </Button>
    </div>
  );
}
