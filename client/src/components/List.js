import React, { Component } from "react";
import Search from "./Search";
import { TextField, Box } from "@material-ui/core";

export default class List extends Component {
  state = {
    productSearch: ""
  };

  getStatus = (arr) => {
    if (arr.status === false) {
      return "Unavailable";
    } else {
      return "Available";
    }
  };
  onSearchBoxChange = (event) => {
    console.log("Keyboard typing");
    console.log(event.target.value);
    this.setState({ productSearch: event.target.value });
  };
  render() {
    return (
      <div>
        <Box>
          <form noValidate>
            <TextField
              label="Search a charger here"
              onChange={this.onSearchBoxChange}
              value={this.state.productSearch}
            ></TextField>
          </form>
        </Box>

        {/* <input
          placeholder="search a charger here"
          onChange={this.onSearchBoxChange}
          value={this.state.productSearch}
        ></input> */}
        <Box m={2}>
          <Search
            isAuthenticated={this.props.isAuthenticated}
            getStatus={this.getStatus}
            chargers={this.props.chargers.filter((h) =>
              h.name
                .toUpperCase()
                .includes(this.state.productSearch.toUpperCase())
            )}
          />
        </Box>

        {/* {this.props.chargers.map((charger) => {
          return (
            <div>
              <Typography>{charger.id}</Typography>
              <Typography>Name: {charger.name}</Typography>
              <Typography>Address: {charger.location}</Typography>
              <Typography>Status: {this.getStatus(charger)}</Typography>
              <Typography>
                Speed: {charger.speed} - {charger.kW} kW
              </Typography>
              <Typography>Connector Type: {charger.connectorType}</Typography>
              <Typography>Price: {charger.price} </Typography>
              <p>-----------------------------------------</p>
            </div>
          );
        })} */}
      </div>
    );
  }
}
