const express = require("express");
const { authenticate } = require("../middleware/authenticate.user");
const { DashboardModel } = require("../model/dashboard.model");
const dashboardRouter = express.Router();

// Add Employee

dashboardRouter.post("/employees", authenticate, async (req, res) => {
  const { firstName, lastName, department, salary, email } = req.body;
  const employeeEmail = await DashboardModel.find({ email: email });
  try {
    if (employeeEmail.length > 0) {
      return res.json("Employee is already registered");
    }
    let employeeDetails = new DashboardModel({
      firstName,
      lastName,
      department,
      salary,
      email,
    });

    await employeeDetails.save();
    res.json({ message: "Employee Added" });
  } catch (error) {
    console.log(error);
    res.json("Error in employee registering route");
  }
});
// get all employee

dashboardRouter.get("/employees", async (req, res) => {
  const getAllEmployee = await DashboardModel.find();
  res.json(getAllEmployee);
});

// Patch

dashboardRouter.patch("/editEmployee", async (req, res) => {
  const details = req.body;
  try {
    var data = await DashboardModel.updateOne(
      { email: details.email },
      { ...details }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.json("Error in employee patch route");
  }
});

// delete

dashboardRouter.delete("/employeeDelete/:email", async (req, res) => {
  const employeeEmail = req.params.email;

  try {
    const data = await DashboardModel.deleteOne({ email: employeeEmail });
    console.log(data);
    res.json({ message: "data deleted" });
  } catch (error) {
    console.log(error);
    res.json("something went wrong in delete");
  }
});

// filter by department

dashboardRouter.get("/filterEmployee/:department", async (req, res) => {
  const department = req.params.department;
  const data = await DashboardModel.find({ department });
  res.json(data);
});

// sort by salary

dashboardRouter.get("/sortEmployee/:category", async (req, res) => {
  const number = req.params.category;
  const sortedData = await DashboardModel.find().sort({ salary: number });
  res.json(sortedData);
});

// Search User
dashboardRouter.get("/searchEmployee/:name", async (req, res) => {
  const name = req.params.name;
  const search = await DashboardModel.find({ firstName: name });
  res.json(search);
});

module.exports = {
  dashboardRouter,
};
