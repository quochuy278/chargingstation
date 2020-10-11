const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const db = require("./db");
const bcrypt = require("bcryptjs");
const passport = require("passport");
var Strategy = require("passport-http").BasicStrategy;

const saltRounds = 4;

app.use(bodyParser.json());
app.use(cors());

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

app.get(
  "/hello-protected",
  passport.authenticate("basic", { session: false }),
  (req, res) => res.send("Hello Protected World!")
);

// app.get(
//   "/users",
//   passport.authenticate("basic", { session: false }),
//   (req, res) => {
// db.query("SELECT id, username FROM users WHERE username = ?", [
//   req.body.auth.username
// ])
//   .then((results) => {
//     console.log(results);
//     console.log(req.body);
//     res.sendStatus(201);
//   })
//   .catch((err) => {
//     console.log(err);
//     res.sendStatus(500);
//   });
//   }
// );

app.get("/users", (req, res) => {
  console.log(req);
  console.log(res);
  db.query("SELECT id, username FROM users")
    .then((result) => {
      console.log("yep");
    })
    .catch((err) => {
      console.log(err);
    });
});

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
            res.sendStatus(204);
          }
        } else {
          console.log("username does not exits");
          res.sendStatus(206);
        }
      }
    });
  } else {
    res.sendStatus(400);
  }
});

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
    bcrypt
      .hash(password, saltRounds)
      .then((hash) =>
        db.query("INSERT INTO users (id,username, password) VALUES (?,?,?)", [
          id,
          username,
          hash
        ])
      )
      .then((dbResults) => {
        console.log(dbResults);
        res.sendStatus(201);
      })
      .catch((error) => {
        res.sendStatus(500);
      });
  } else {
    console.log(
      "incorrect username or password, both must be strings and username more than 4 long and password more than 6 characters long"
    );
    res.sendStatus(400);
  }
});

/* DB init */
Promise.all([
  db.query(`CREATE TABLE IF NOT EXISTS users(
          id VARCHAR(256) PRIMARY KEY,
          username VARCHAR(32),
          password VARCHAR(256)
      )`)
  // Add more table create statements if you need more tables
])
  .then(() => {
    console.log("database initialized");
    app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
    });
  })
  .catch((error) => console.log(error));
