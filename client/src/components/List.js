
import React, { Component } from 'react'
import { Typography } from "@material-ui/core";
import Search from './Search';

export default class List extends Component {
 
    state = {
      productSearch:"",
      
  }
  
  getStatus = (arr) => {
        if (arr.status === false) {
          return "Unavailable";
        } else {
          return "Available";
        }
      };
  onSearchBoxChange = (event) => {
    console.log('Keyboard typing');
    console.log(event.target.value);
    this.setState({productSearch: event.target.value})
  }
  render() {
    return (<div>
      <div>
           <input placeholder="search a charger here" onChange={this.onSearchBoxChange} value={this.state.productSearch}></input>
        </div>
      <Search 
      chargers={this.props.chargers.filter((h)=> h.name.toUpperCase().includes(this.state.productSearch.toUpperCase()))} 
      // items={ this.state.items.filter((item) => item.name.includes(this.state.productSearchString)) }
      />
        {this.props.chargers.map((charger) => {
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
          })}
        </div>
     )
}
}