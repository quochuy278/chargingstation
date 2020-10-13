const express = require("express");
const router = express.Router();
const chargerData = require("../data/data.json");

//  Return all charger information
router.get("/", (req, res) => {
  res.json(chargerData.chargers);
});

//  Return information of a single charger
router.get("/:id", (req, res) => {
  const result = chargerData.chargers.find((char) => char.id == req.params.id);
  if (!result) {
    res.status(500).send("Charger not found.");
  } else {
    res.json(result);
  }
});

module.exports = router;
