const mongoose = require("mongoose");

const logoutSchema = mongoose.Schema({
    token:String
})

const LogoutModel = mongoose.model("token",logoutSchema);

module.exports ={
    LogoutModel
}