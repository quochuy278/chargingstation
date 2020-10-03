import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Location from "./pages/Location";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#e17055",
      secondary: "white",
      third: "#d63031"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/location" component={Location} />
          <Route path="/about" component={About} />
          {/* <Route path="*">404 Page</Route> */}
        </Switch>
        <Footer></Footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
