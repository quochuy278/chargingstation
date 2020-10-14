import React from "react";
// import Auth from './components/Auth';
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute(props) {
  const { isAuthenticated, confirm, ...rest } = props;
  let output;

  if (isAuthenticated && confirm) {
    output = <Route {...rest} />;
  } else {
    output = <Redirect to="/location" />;
  }

  return <React.Fragment>{output}</React.Fragment>;
}
