const db = require("../database");
const collection = db.collection("users");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

router.route("/login/").post((req, res, next) => {
  const { username, password } = req.body;

  collection
    .all()
    .then((cursor) => {
      let oldUser;
      cursor.map((user) => {
        if (username === user.username && password === user.password) {
          oldUser = {
            username: username,
            password: password,
          };
        }
      });
      //console.log(oldUser, username);
      return oldUser;
    })
    .then((oldUser) => {
      console.log(oldUser.username);
      const token = jwt.sign(oldUser, "enigma");
      res.status(200).json({ token: token, user: oldUser.username });
      //return { token: token };
    })
    .catch((err) => console.log("--->", err.body));
});

router.route("/signup/").post((req, res, next) => {
  const { username, email, password } = req.body;

  collection
    .all()
    .then((cursor) =>
      cursor.map((user) => {
        if (username === user.username) {
          throw new Error("already exist");
        }
      })
    )
    .then(() => {
      const newUser = {
        username: username,
        email: email,
        password: password,
      };

      collection
        .save(newUser)
        .then(() => console.log("welcome user!!"))
        .catch((err) => console.log(err));

      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(401);
    });
});

module.exports = router;
