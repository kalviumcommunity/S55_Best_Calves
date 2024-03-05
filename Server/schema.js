const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    age: Number,
    calf_ratings: Number,
    height: String,
    img_url: String
});
const userModel = mongoose.model("calfkings-collections", userSchema);
module.exports = {userModel};

