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

// Use a hardcoded username for now
const myName = "Anonymous";

const data = {
  treasures: [
    {
      clue: "newest clue",
      long: 0,
      lat: 0,
      uuid: "db9500f1-9ba2-44f3-befe-6d5d89738789",
      treasure: {
        name: "hello",
        description: "world",
        uuid: "abc123",
        is_active: true,
      },
      placed_by: { sub: "3d80c013d0d0f2379622acf1f324c6fa", is_active: true },
      placed_at: "2023-01-24T19:03:07",
    },
    {
      clue: "now its in a new place",
      long: 123,
      lat: -69.42,
      uuid: "6f33f91b-7ce7-415e-ac37-db10e10e40b0",
      treasure: {
        name: "new treasure",
        description: "its new",
        uuid: "eefb0268-fbaf-4065-a16e-ec87444a1eab",
        is_active: true,
      },
      placed_by: { sub: "3d80c013d0d0f2379622acf1f324c6fa", is_active: true },
      placed_at: "2023-01-24T20:32:19",
    },
  ],
};

router.get("/treasures", (req, res) => {
  // send back all of the stories!
  res.send(data.treasures);
});

// catch all /api route
router.all("*", (req, res) => {
  console.log(`API Route not found: ${req.method} ${req.url}`);
  res.status(404).send({ message: "API Route not found" });
});

module.exports = router;
