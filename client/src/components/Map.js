import React, { useState, useEffect } from "react";
import { getMaps } from "./AxiosClient";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import mapStyles from "./MapStyles";

const libraries = ["places"];

const mapContainerStyle = {
  height: "100vh",
  width: "100%"
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
};

const center = {
  lat: 65.012093,
  lng: 25.465076
};

export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDOduUSUYX6lFwhxQmx2b3yHifFBAwiHSw",
    libraries
  });

  const [location, setLocation] = useState([]);
  const [charger, setSelectedCharger] = useState(null);
  const getData = () => {
    getMaps()
      .then((res) => {
        setLocation(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(location);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map; //load the position
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {location.map((items) => {
          //map data and render all the position of the chargers in 100 miles
          return (
            <Marker
              key={items.AddressInfo.ID}
              position={{
                lat: items.AddressInfo.Latitude,
                lng: items.AddressInfo.Longitude
              }}
              onClick={() => {
                setSelectedCharger(items);
              }}
              icon={{
                url: "/charger.png", // replay the marker icon
                scaledSize: new window.google.maps.Size(25, 25) //size the symbol
              }}
            />
          );
        })}

        {charger && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedCharger(null);
            }}
            position={{
              lat: charger.AddressInfo.Latitude,
              lng: charger.AddressInfo.Longitude
            }}
          >
            <div>
              <h1>{charger.AddressInfo.Title}</h1>
              <p>Address: {charger.AddressInfo.AddressLine1}</p>
              <p>Charger available: {charger.NumberOfPoints}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.jpg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000
    }
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
