const express = require("express");
const app = express();
const port = 3306;
const bodyParser = require("body-parser");
const db = require("./db");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const passport = require("passport");
var Strategy = require("passport-http").BasicStrategy;
const chargerComponent = require("./components/chargers");

app.use(cors());
app.use(bodyParser.json());
app.use("/chargers", chargerComponent);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// to check username and password given against which stored in db
passport.use(
  new Strategy((username, password, cb) => {
    db.query("SELECT id, username, password FROM users WHERE username = ?", [
      username
    ])
      .then((dbResults) => {
        if (dbResults.length == 0) {
          return cb(null, false);
        }

        bcrypt.compare(password, dbResults[0].password).then((bcryptResult) => {
          if (bcryptResult == true) {
            cb(null, dbResults[0]);
          } else {
            return cb(null, false);
          }
        });
      })
      .catch((dbError) => cb(err));
  })
);

// register user
const saltRounds = 4;
app.post("/register", (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let id = uuidv4();
  if (
    typeof username === "string" &&
    username.length > 4 &&
    typeof password === "string" &&
    password.length > 6
  ) {
    db.query("SELECT * FROM users WHERE username = ?", [username], function(
      err,
      results,
      fields
    ) {
      if (err) {
        console.log(err);
      } else if (results.length == 0) {
        bcrypt
          .hash(password, saltRounds)
          .then((hash) =>
            db.query(
              "INSERT INTO users (id, username, password) VALUES (?,?,?)",
              [id, username, hash]
            )
          )
          .then((dbResults) => {
            console.log(dbResults);
            res.sendStatus(201);
          })
          .catch((error) => {
            error.sendStatus(500);
          });
      } else if (results.length > 0) {
        res.send("Username already exits");
        console.log("Username already exits");
      }
    });
  } else {
    console.log(
      "incorrect username or password, both must be strings and username more than 4 long and password more than 6 characters long"
    );
    res.sendStatus(400);
  }
});

// login user

app.post("/login", (req, res) => {
  let username = req.body.auth.username;
  let password = req.body.auth.password;

  if (username && password) {
    db.query("SELECT * FROM users WHERE username = ?", [username], function(
      err,
      results,
      fields
    ) {
      if (err) {
        res.sendStatus(400);
      } else {
        if (results.length > 0) {
          const comparision = bcrypt.compareSync(password, results[0].password);
          if (comparision) {
            console.log("login sucessfull");
            res.sendStatus(200);
          } else {
            console.log("username and password does not match");
            res.sendStatus(400);
          }
        } else {
          console.log("username does not exits");
          res.sendStatus(400);
        }
      }
    });
  } else {
    res.sendStatus(400);
  }
});

// history data
app.post("/history", (req, res) => {
  let username = req.body.username;
  let address = req.body.address;
  let chargetime = req.body.lengthChargeTime;
  let cost = req.body.chargeCost;

  db.query(
    "INSERT INTO chargers (username, address, lengthChargeTime, chargeCost, chargeDate) VALUES (?,?,?,?, CURDATE() )",
    [username, address, chargetime, cost],
    function(err, dbresults, fields) {
      if (err) {
        res.send(err);
      }
      res.sendStatus(201);
    }
  );
});

// get protected information of users
app.get(
  "/history/:id",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    db.query("SELECT * FROM chargers WHERE username = ?", [req.params.username])
      .then((results) => {
        res.json(results);
      })
      .catch(() => {
        res.sendStatus(500);
      });
  }
);

/* DB init */
Promise.all([
  db.query(`CREATE TABLE IF NOT EXISTS users(
          id VARCHAR(256) PRIMARY KEY,
          username VARCHAR(32),
          password VARCHAR(256)
      )`),
  db.query(`CREATE TABLE IF NOT EXISTS chargers(
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(32), address VARCHAR(256), lengthChargeTime VARCHAR(256), chargeCost VARCHAR(256), chargeDate DATETIME
      )`)
])
  .then(() => {
    console.log("database initialized");
    app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
    });
  })
  .catch((error) => console.log(error));
