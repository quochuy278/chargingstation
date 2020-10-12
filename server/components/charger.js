const express = require("express");
const db = require("../db");
const router = express.Router();
const chargerData = require("../../client/src/chargers.json");

//  Return all charger information
router.get("/", (req, res) => {
  res.json(chargerData);
});

//  Return information of a single charger
router.get("/:id", (req, res) => {
  const result = chargerData.find((char) => char.id == req.params.id);
  if (!result) {
    res.status(500).send("Dog not found.");
  } else {
    res.json(result);
  }
});

router.post("/", (req, res) => {
  db.query(
    "INSERT INTO charger (name, location, speed, type, price, electricity, status,lat,lng ) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [
      req.body.name,
      req.body.location,
      req.body.speed,
      req.body.type,
      req.body.price,
      req.body.electricity,
      req.body.status,
      req.body.lat,
      req.body.lng
    ]
  )
    .then((results) => {
      console.log(results);
      res.sendStatus(201);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});

module.exports = router;
