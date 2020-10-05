import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Location from "./pages/Location";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Auth from "./components/Auth";
import ExampleProtectedView from "./components/ExampleView";
import ProtectedRoute from "./components/ProtectedRoute";
import constants from "./constants.json";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e17055",
      secondary: "white",
      third: "#d63031"
    }
  }
});

export default class App extends Component {
  state = {
    isAuthenticated: false,
    someData: []
  };

  onLogin = () => {
    this.setState({ isAuthenticated: true });
    console.log("login");
  };

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  };

  loadProtectedData = () => {
    axios
      .get(constants.baseAddress + "/hello-protected", Auth.getAxiosAuth())
      .then((results) => {
        this.setState({ someData: results.data });
      });
  };

  render() {
    return (
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Header onLogin={this.onLogin}></Header>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/location" component={Location} />
              <Route path="/about" component={About} />
              <Route path="/register">
                <Register></Register>
              </Route>
              <Route
                path="/login"
                exact
                render={(routeProps) => (
                  <Login
                    loginSuccess={this.onLogin}
                    loginFail={this.onLoginFail}
                    userInfo={this.state.userInfo}
                    redirectPathOnSuccess="/example"
                    {...routeProps}
                  />
                )}
              />
              <ProtectedRoute
                isAuthenticated={this.state.isAuthenticated}
                path="/example"
                exact
                render={(routeProps) => (
                  <ExampleProtectedView
                    loadProtectedData={this.loadProtectedData}
                    someData={this.state.someData}
                  />
                )}
              ></ProtectedRoute>
              {/* <Route path="*">404 Page</Route> */}
            </Switch>
            <Footer></Footer>
          </div>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}
