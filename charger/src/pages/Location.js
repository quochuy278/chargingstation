
import React, { Component } from 'react';
import GoogleMapReact, {Marker} from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Location extends Component {
  static defaultProps = {
    center: {
      lat: 65.012093,
      lng: 25.465076
    },
    zoom: 15
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={65.012093}
            lng={25.465076}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Location;