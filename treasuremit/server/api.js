/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

const router = express.Router();

const Users = require("../src/pages/api/models/User");
const Treasures = require("../src/pages/api/models/Treasure");

router.get("/users", (req, res) => {
  // empty selector means get all documents
  Users.find({}).then((stories) => res.send(stories));
});

// catch all /api route
router.all("*", (req, res) => {
  console.log(`API Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ message: "API Route not found" });
});

module.exports = router;
