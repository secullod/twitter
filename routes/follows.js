const express = require("express");
const router = express.Router();
var db = require("../db.js");

router.get("/:currentUser", (req, res) => {
  let sql = `SELECT U.uid, U.username
    FROM users U
    INNER JOIN follows F ON U.uid = F.uid
    WHERE F.follower = ${req.params.currentUser}`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(results);
  });
});

router.post("/", (req, res) => {
  let post = { uid: req.body["uid"], follower: req.body["follower"] };
  let sql = "INSERT INTO follows SET ?";
  db.query(sql, post, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

router.put("/", (req, res) => {
  let sql = `DELETE FROM follows
WHERE (uid, follower) = (${req.body["uid"]}, ${req.body["follower"]})`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

module.exports = router;
