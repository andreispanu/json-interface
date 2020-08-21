
const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");


//Pull Scan data
const data = require('./data/scanData.json');

let whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(async (req, res, next) => {
  next();
});

app.get("/", (req, res) => res.send("Api running"));
app.get("/results", (req, res, next) => {
  res.send(data);
});
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
