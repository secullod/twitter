const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sean1234",
  database: "twitter",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected to mysql");
});

const app = express();

app.use(express.json());

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE twitter";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database Created");
  });
});

app.get("/createtweets", (req, res) => {
  let sql =
    "CREATE TABLE tweets(tid int auto_increment, primary key(tid), uid int, post varchar(140), date datetime, key(date), key(uid, date))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("tweet table created");
  });
});

app.get("/createfollows", (req, res) => {
  let sql =
    "CREATE TABLE follows(uid int, follower int, primary key(uid, follower))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("follows table created");
  });
});

app.get("/createfollows", (req, res) => {
  let sql =
    "CREATE TABLE follows(uid int, follower int, primary key(uid, follower))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("follows table created");
  });
});

app.get("/createusers", (req, res) => {
  let sql =
    "CREATE TABLE users(uid int auto_increment, primary key(uid), username varchar(255))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("follows table created");
  });
});

app.get("/users", (req, res) => {
  let post = { username: "gob" };
  let sql = "INSERT INTO users SET ?";
  db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("user added");
  });
});

app.get("/follows", (req, res) => {
  let post = { uid: 4, follower: 3 };
  let sql = "INSERT INTO follows SET ?";
  db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("follower added");
  });
});

app.get("/tweets", (req, res) => {
  let post = { tid: 1, uid: 3, post: "hello", date: "2020-12-12" };
  let sql = "INSERT INTO tweets SET ?";
  db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("tweet added");
  });
});

app.get("/getusers", (req, res) => {
  let sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("users fetched");
  });
});

app.get("/getfollows", (req, res) => {
  let sql = "SELECT * FROM follows";
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("follows fetched");
  });
});

// app.get("/getweets", (req, res) => {
//   let sql = "SELECT * FROM tweets";
//   db.query(sql, (err, results) => {
//     if (err) {
//       throw err;
//     }
//     console.log(results);
//     res.send(results);
//   });
// });

app.get("/getweets", (req, res) => {
  let sql = `SELECT T.tid, T.uid, T.post, T.date 
    FROM tweets T
    INNER JOIN follows F ON T.uid = F.uid
    WHERE F.follower = 5`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(results);
  });
});

app.get("/getusersfollowed", (req, res) => {
  let sql = `SELECT U.uid, U.username
    FROM users U
    INNER JOIN follows F ON U.uid = F.uid
    WHERE F.follower = 5`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(results);
  });
});

// app.get("/getusersnotfollowed", (req, res) => {
//   let sql = `SELECT U.uid, U.username
//     FROM users U
//     INNER JOIN follows F ON U.uid <> F.uid
//     WHERE F.follower = 5`;
//   db.query(sql, (err, results) => {
//     if (err) {
//       throw err;
//     }
//     console.log(results);
//     res.send(results);
//   });
// });

app.listen("3000", () => {
  console.log("server started on port 3000");
});
