const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const passportHttp = require("passport-http");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

let users = [
  {
    id: "70c618cb-a9a8-43f3-b692-3878a9ec44e1",
    username: "johndoe",
    password: "$2a$08$YIj.vn8QVGYWtOzp.u7acOZgHYM4cVRH13Ws5kbQT4RxKOLbmX4ta", // 123456
    email: "john@doe"
  }
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  console.log(req.body);

  const passwordHash = bcrypt.hashSync(req.body.password, 8);

  users.push({
    id: uuidv4(),
    username: req.body.username,
    password: passwordHash,
    email: req.body.email
  });

  res.sendStatus(200);
});

app.get("/users", (req, res) => {
  res.json(users);
});

passport.use(
  new passportHttp.BasicStrategy(function(username, password, done) {
    const userResult = users.find((user) => user.username === username);
    if (userResult == undefined) {
      return done(null, false);
    }

    if (bcrypt.compareSync(password, userResult.password) == false) {
      return done(null, false);
    }

    done(null, userResult);
  })
);

// This one should be protected with HTTP Basic
app.post(
  "/login",
  passport.authenticate("basic", { session: false }),
  (req, res) => {
    console.log(req.user);
    res.sendStatus(200);
  }
);

app.get("/unprotected", (req, res) => res.send("Hello World!"));

app.get(
  "/hello-protected",
  passport.authenticate("basic", { session: false }),
  (req, res) => res.send("Hello Protected World!")
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
