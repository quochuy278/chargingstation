import React, { useState, useEffect } from "react";
import * as ChargersData from '../data/data.json'


export default function List() {

  return (
    <div>
      {ChargersData.chargers.map((charger) => {
        return (
          <>
            <div>
        <p>{charger.id}</p>
              <div>Title: {charger.name}</div>
              <div>Address: {charger.location}</div>
              <div>Speed: {charger.speed}</div>
              <div>Price: {charger.price}  </div>
              <p>-----------------------------------------</p>
            </div>
          </>
        );
      })}
    </div>
  );
}
