import React from "react";
import * as ChargersData from "../data/data.json";
import { Typography } from "@material-ui/core";

export default function List() {
  const 
  return (
    <div>
      {ChargersData.chargers.map((charger) => {
        return (
          <div>
            <Typography>{charger.id}</Typography>
            <Typography>Name: {charger.name}</Typography>
            <Typography>Address: {charger.location}</Typography>
            <Typography>Status:</Typography>
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
  );
}

// const [items, setItems] = useState([]);

// const getData = () => {
//   getMaps()
//     .then((res) => {
//       console.log(res.data);
//       setItems(res.data);
//     })
//     .catch((error) => console.log(error));
// };
// useEffect(() => {
//   getData();
// }, []);

// const check = (array) => {
//   if (array.Reference == null) return "Charger not available";
//   else return array.Reference;
// };

// const fastChargeCheck = (array) => {
//   if (array.Level.IsFastChargeCapable === false) return "Unavailable";
//   else if (array.Level.IsFastChargeCapable === true) return "Available";
// };

// const connectionTypeCheck = (array) => {
//   if (array.ConnectionType.Title === "Unknown") return "Type 2 Connectors";
//   else return array.ConnectionType.Title;
// };
