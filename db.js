const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

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
  console.log("Connected to MySql");
});

module.exports = db;

const app = express();
app.use(cors());
app.use(express.json());

const tweetsRouter = require("./routes/tweets");
const usersRouter = require("./routes/users");
const followsRouter = require("./routes/follows");
const tablesRouter = require("./routes/tables");
const databaseRouter = require("./routes/database");

app.use("/tweets", tweetsRouter);
app.use("/users", usersRouter);
app.use("/follows", followsRouter);
app.use("/tables", tablesRouter);
app.use("/database", databaseRouter);

app.listen("3000", () => {
  console.log("server started on port 3000");
});
