import React from "react";
import { Link } from "react-router-dom";

export default function List(props) {
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

  return (
    <div>
      {props.items.map((charger) => {
        return (
          <div>
            <b>Title: {charger.AddressInfo.Title}</b>
            <b>Address: {charger.AddressInfo.AddressLine1}</b>
            <b>Chargers: {charger.NumberOfPoints}</b>
            <div>
              {charger.Connections.map((chargerInfo) => {
                return (
                  <ul>
                    <li>ID: {chargerInfo.ID}</li>
                    <li>Reference: {props.check(chargerInfo)}</li>
                    <li>Comments: {chargerInfo.Level.Title}</li>
                    <li>Fast charge: {props.fastChargeCheck(chargerInfo)}</li>
                    <li>
                      Connection type:
                      {props.connectionTypeCheck(chargerInfo)}
                    </li>
                  </ul>
                );
              })}
            </div>
            <p>-----------------------------------------</p>
          </div>
        );
      })}
    </div>
  );
}
