const express = require("express");
const router = express.Router();
var db = require("../db.js");

router.post("/", (req, res) => {
  let post = {
    uid: req.body["uid"],
    post: req.body["post"],
    date: req.body["date"],
  };
  let sql = "INSERT INTO tweets SET ?";
  db.query(sql, post, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

router.get("/:currentUser", (req, res) => {
  let sql = `SELECT T.tid, T.uid, T.post, T.date 
    FROM tweets T
    INNER JOIN follows F ON T.uid = F.uid
    WHERE F.follower = ${req.params.currentUser}`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(results);
  });
});

module.exports = router;
