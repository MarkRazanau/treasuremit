const mongoose = require("mongoose");

//define a story schema for the database
const UserSchema = new mongoose.Schema({
  access_token: String,
  name: String,
  treasures_found: Array,
});

// compile model from schema
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
