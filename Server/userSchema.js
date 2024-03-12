const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password:String
});
const UserModel = mongoose.model("credential", userSchema);
console.log(UserModel)
module.exports = {UserModel};