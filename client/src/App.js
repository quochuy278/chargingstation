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
import ProtectedRoute from "./components/ProtectedRoute";
import constants from "./constants.json";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import Price from "./components/Price";

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
    chargers: [],
    time: { ms: 0, s: 0, m: 0, h: 0 },
    interv: null,
    status: 0,
    totalPrice: 0,
    confirm: false,
    selectedCharger: null,
    value: null,
    energyUsed: 0
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

  start = () => {
    this.run();
    this.setState({ status: 1 });
    this.setState({ interv: setInterval(this.run, 10) });
  };

  run = () => {
    var updatedMs = this.state.time.ms,
      updatedS = this.state.time.s,
      updatedM = this.state.time.m,
      updatedH = this.state.time.h;
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }

    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }

    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }

    updatedMs++;

    return this.setState({
      time: {
        ms: updatedMs,
        s: updatedS,
        m: updatedM,
        h: updatedH
      }
    });
  };

  stop = () => {
    clearInterval(this.state.interv);
    this.setState({ status: 2 });
  };

  resume = () => this.start();

  clear = () => {
    this.setState({ interv: 0 });
    this.setState({ time: { ms: 0, s: 0, m: 0, h: 0 } });
    this.setState({ confirm: false });
    this.setState({ status: 0 });
  };

  verify = (event) => {
    const fil = this.state.chargers.map((charger) => charger.digit);
    if (fil.includes(Number(event.target["digit"].value))) {
      let a = this.state.chargers.filter(
        (charger) => charger.digit == Number(event.target["digit"].value)
      );
      console.log(a[0]);
      if (a[0].status) {
        this.setState({ confirm: true });
        this.setState({ selectedCharger: a[0] });
      } else {
        alert("This charger is not available");
      }
    } else {
      alert("The digit doesn not exist");
    }
    event.preventDefault();
  };

  render() {
    const price = () => {
      let sum;
      let energy;
      let kw = this.state.selectedCharger.kW;
      let cost = this.state.selectedCharger.price;

      if (this.state.selectedCharger.speed === "Slow") {
        sum = (
          cost *
          (this.state.time.h * 60 +
            this.state.time.m +
            this.state.time.s / 60 +
            this.state.time.ms / 3600)
        ).toFixed(5);
      } else {
        energy =
          kw *
          (this.state.time.h +
            this.state.time.m / 60 +
            this.state.time.s / 3600 +
            (this.state.time.ms / 3600) * 60);
        sum = cost * energy.toFixed(5);
      }

      this.setState({ totalPrice: sum });
      this.setState({ energyUsed: energy });
    };

    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Header
            onLogout={this.onLogout}
            isAuthenticated={this.state.isAuthenticated}
            clear={this.clear}
          ></Header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/location"
              render={(routeProps) => (
                <Location
                  isAuthenticated={this.state.isAuthenticated}
                  chargers={this.state.chargers}
                  selectedCharger={this.state.selectedCharger}
                  verify={this.verify}
                  confirm={this.state.confirm}
                  time={this.state.time}
                  status={this.state.status}
                  resume={this.resume}
                  start={this.start}
                  stop={this.stop}
                  reset={this.reset}
                  totalPrice={this.state.totalPrice}
                  {...routeProps}
                  clear={this.clear}
                  energyUsed={this.state.energyUsed}
                ></Location>
              )}
            ></Route>
            <ProtectedRoute
              isAuthenticated={this.state.isAuthenticated}
              confirm={this.state.confirm}
              path="/total"
              exact
              render={(routeProps) => (
                <Price
                  price={price}
                  selectedCharger={this.state.selectedCharger}
                  totalPrice={this.state.totalPrice}
                  time={this.state.time}
                  clear={this.clear}
                  interv={this.state.interv}
                  confirm={this.state.confirm}
                  status={this.state.status}
                  energyUsed={this.state.energyUsed}
                  {...routeProps}
                />
              )}
            ></ProtectedRoute>
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
          </Switch>
          <Footer></Footer>
        </div>
      </ThemeProvider>
    );
  }
}
