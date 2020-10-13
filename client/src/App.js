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
import Profile from "./components/Profile";
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
    someData: [],
    userInfor: [],
    chargers: []
  };

  componentDidMount() {
    axios
      .get(constants.baseAddress + "/chargers")
      .then((res) => {
        this.setState({ chargers: res.data });
      })
      .catch((err) => console.log(err));
  }

  onLoginSuccess = () => {
    this.setState({ isAuthenticated: true });
    console.log("login");
  };

  onLoginFail = () => {
    this.setState({ isAuthenticated: false });
    console.log("Login failed");
  };

  onLogout = () => {
    this.setState({ isAuthenticated: false });
    console.log("Logout");
  };

  loadProtectedData = () => {
    axios
      .get(constants.baseAddress + "/hello-protected", Auth.getAxiosAuth())
      .then((results) => {
        this.setState({ someData: results.data });
      });
  };

  render() {
    console.log(this.state);
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header
            onLogout={this.onLogout}
            isAuthenticated={this.state.isAuthenticated}
          ></Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/location">
              <Location
                isAuthenticated={this.state.isAuthenticated}
                chargers={this.state.chargers}
              ></Location>
            </Route>
            <Route path="/about" component={About} />
            <Route path="/register">
              <Register></Register>
            </Route>
            <Route
              path="/login"
              exact
              render={(routeProps) => (
                <Login
                  onLoginSuccess={this.onLoginSuccess}
                  onLoginFail={this.onLoginFail}
                  {...routeProps}
                />
              )}
            />
            <ProtectedRoute
              isAuthenticated={this.state.isAuthenticated}
              path="/users"
              exact
              render={(routeProps) => (
                <Profile
                  loadProtectedData={this.loadProtectedData}
                  userInfor={this.state.userInfor}
                  getUser={this.getUser}
                />
              )}
            ></ProtectedRoute>
            {/* <Route path="*">404 Page</Route> */}
          </Switch>

          <Footer></Footer>
        </div>
      </ThemeProvider>
    );
  }
}
