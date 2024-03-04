const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    name: String,
    age: Number,
    calf_ratings: Number,
    currently_playing: Boolean,
    height: String,
    img_url: String
});
const Model = mongoose.model("calfkings-collections", testSchema);
module.exports = {Model};