import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import user from "../models/userModel/user.js";
//VERIFY JWT Token to protect routes
const requireSignin = async (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_TOKEN);
    //assign || pass decoded user to req object
    req.user = decode;
    next();
  } catch (error) {
    console.log(`error in requireSignin function ${error}`.bgRed.white);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    // get role of login user from request body
    const loginRole = req.body.role;
    //check role of user from DB
    //get user by id
    const loginUser = await user.findById(req.user._id);
    //check for admin role
    if (loginUser.role !== 1) {
      return res.status(200).send({
        message: "Unauthorised user",
        success: false,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(`error in isAdmin middleware ${error}`.bgRed.white);
    return res.status(500).send({
      message: "error in isAdmin middleware",
      error,
      success: false,
    });
  }
};

export { requireSignin, isAdmin };
