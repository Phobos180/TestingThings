const express = require("express");
const timer = require("minutes-timer");
const app = express();
const rabbit = require("./factory");

try {
  console.log("Sono partito");
  rabbit();
} catch (err) {
  console.log("Sono partito in errore");
}

app.get("/api", (req, res) => {
  res.json({ users: ["userone", "userTwo", "userThree"] });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
