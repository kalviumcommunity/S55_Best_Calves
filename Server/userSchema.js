const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: String,
    password:String
});
const loginModel = mongoose.model("credential", userSchema);
console.log(loginModel)
module.exports = {loginModel};