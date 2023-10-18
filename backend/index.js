const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { dashboardRouter } = require("./routes/dashboard.route");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/home", (req, res) => {
  res.send("EMPLOYEE MANAGEMENT SYSTEM");
});

app.use("/", userRouter);
app.use("/dashboard", dashboardRouter);

app.listen(process.env.Port, async () => {
  try {
    await connection;
    console.log("Connected to Database");
    console.log("Connected to Server");
  } catch (error) {
    console.log("Error in connection", error);
  }
});
