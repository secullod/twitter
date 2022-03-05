const API = require("axios");

API.get(`http://localhost:3000/getweets`).then((result) => console.log(result));
API.get(`http://localhost:3000/getfollowedtweets`).then((result) =>
  console.log(result)
);
