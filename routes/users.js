const express = require("express");
const router = express.Router();
var db = require("../db.js");

router.get("/", (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

router.post("/", (req, res) => {
  let post = { username: req.body["username"] };
  let sql = "INSERT INTO users SET ?";
  db.query(sql, post, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

module.exports = router;
