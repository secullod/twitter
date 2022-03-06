const express = require("express");
const router = express.Router();
var db = require("../db.js");

router.get("/", (req, res) => {
  let sql = "CREATE DATABASE twitter";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database Created");
  });
});

module.exports = router;
