const express = require("express");
const router = express.Router();
var db = require("../db.js");

router.get("/tweets", (req, res) => {
  let sql =
    "CREATE TABLE tweets(tid int auto_increment, primary key(tid), uid int, post varchar(140), date datetime, key(date), key(uid, date))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("tweet table created");
  });
});

router.get("/follows", (req, res) => {
  let sql =
    "CREATE TABLE follows(uid int, follower int, primary key(uid, follower))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("follows table created");
  });
});

router.get("/users", (req, res) => {
  let sql =
    "CREATE TABLE users(uid int auto_increment, primary key(uid), username varchar(255))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("follows table created");
  });
});

module.exports = router;
