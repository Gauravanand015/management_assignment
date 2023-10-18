const mongoose = require("mongoose");

const dashboardSchema = mongoose.Schema({
    firstName:String,
    lastName: String,
    email:String,
    department:String,
    salary:Number
})

const DashboardModel = mongoose.model("dashboard",dashboardSchema)

module.exports = {
    DashboardModel
}