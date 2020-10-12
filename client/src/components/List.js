import React from "react";
import * as ChargersData from '../data/data.json'


export default function List() {

  return (
    <div>
      {ChargersData.chargers.map((charger) => {

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
            <div>
        <p>{charger.id}</p>
              <div>Title: {charger.name}</div>
              <div>Address: {charger.location}</div>
              <div>Speed: {charger.speed}</div>
              <div>Price: {charger.price}  </div>
              <p>-----------------------------------------</p>
            </div>       
          </div>
        );
      })}
    </div>
  );
}
