const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
// Load the APP configuration
require("dotenv").config();
// Initialize Database
const db = require("./db");
// Middleware for JSON POST Request's
app.use(express.json());

app.get("/", (req, res) => res.send("Hello From Server"));

/**
 * End Point for jwt token generation
 */
app.post("/token", (req, res, next) => {
  const token = jwt.sign(
    {
      data: "admin",
    },
    process.env.key || "sssssh",
    { expiresIn: "1h" }
  );
  res.send(token);
});

/**
 * End Point for USER API
 * Pre - isAuthorized Middleware checks for validity of Token
 */
app.use("/api/users", require("./auth").isAuthorized, require("./routes"));
require("./models/user");
// db.sequelize.authenticate().then(async () => {
  // define your models after connection to db is successfull

  // sync db
//   await db.sequelize.sync({ force: true });
// });
// Environment fallbacks
const IP = process.env.SERVER_IP || "localhost";
const PORT = process.env.SERVER_PORT || 8000;
// start express server
app.listen(PORT, IP, () => {
  console.log("Server Started");
  console.log(`API URL : http://${IP}:${PORT}/api/users`);
});
// For Testing
module.exports = app;
