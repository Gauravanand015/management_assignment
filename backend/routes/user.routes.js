const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const { LogoutModel } = require("../model/logout.model");

userRouter.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const userEmail = await UserModel.find({ email: email });
  console.log(password === confirmPassword);
  try {
    if (userEmail.length > 0) {
      console.log("hello");
      return res.json("Email is already in use, try using different email");
    }
    if (password === confirmPassword) {
      bcrypt.hash(password, 6, async (err, hash) => {
        if (err) {
          console.log(err);
          res.json("Something is wrong in bcrypt");
        } else {
          let userDetails = new UserModel({
            email,
            password: hash,
          });

          await userDetails.save();
          res.json({ Message: "User Registered" });
        }
      });
    } else {
      return res.json("Password is not Matching");
    }
  } catch (error) {
    console.log(error);
    res.json("Error in user registering route");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userEmail = await UserModel.find({ email: email });
  try {
    if (userEmail.length > 0) {
      bcrypt.compare(password, userEmail[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.json("something is wrong while comparing in bcrypt");
        } else {
          const token = jwt.sign({ email: userEmail[0].email }, "ALPHA");
          res.json({ message: "login successful", token: token });
        }
      });
    } else {
      res.json("Email is not registered");
    }
  } catch (error) {
    console.log(error);
    res.json("Error in user login route");
  }
});

userRouter.get("/logout", async (req, res) => {
  let token = req.headers.authorization;
  const logout = new LogoutModel({
    token,
  });
  await logout.save();
  res.json("Logout Successfully");
});

module.exports = {
  userRouter,
};
