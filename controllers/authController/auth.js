import { LogTimings } from "concurrently";
import { comparePassword, hashPassword } from "../../helper/authHelper.js";
import user from "../../models/userModel/user.js";
import JWT from "jsonwebtoken";

// controller function to register user
const registerController = async (req, res) => {
  try {
    // get user details from body
    const { name, email, password, address, phone, answer } = req.body;
    //validation
    if (!name) {
      return res.send({ error: "name is required", success: false });
    }
    if (!email) {
      return res.send({ error: "email is required", success: false });
    }
    if (!password) {
      return res.send({ error: "password is required", success: false });
    }
    if (!address) {
      return res.send({ error: "address is required", success: false });
    }
    if (!phone) {
      return res.send({ error: "phone is required", success: false });
    }
    if (!answer) {
      return res.send({ error: "answer is required", success: false });
    }

    console.log("answer", answer);

    //check for user existance
    const existUser = await user.findOne({ email });
    if (existUser) {
      return res.send({
        message: "user is already exist please login",
      });
    }
    // register new user
    //hashing password
    const hashedPassword = await hashPassword(password);
    //create user and save
    const newUser = await new user({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      message: "User Register successfully",
      success: true,
      user: {
        address: newUser.address,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        answer: newUser.answer,
      },
    });
  } catch (error) {
    console.log(`error in register controller ${error}`);
    res.status(500).send({
      message: "error in registration",
      success: false,
      error,
    });
  }
};

//controller function to login user
const loginController = async (req, res) => {
  try {
    //user credential
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    //get user
    const loginUser = await user.findOne({ email });
    if (!loginUser) {
      return res.status(404).send({
        message: "Email not register",
        success: false,
      });
    }
    //compare password
    const validPassword = await comparePassword(password, loginUser.password);
    //checking password
    if (!validPassword) {
      return res.status(500).send({
        message: "Invalid password",
        success: false,
      });
    }

    //set JWT token
    const token = await JWT.sign(
      { _id: loginUser._id },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );
    //login user
    res.status(200).send({
      message: "successfully login",
      success: true,
      user: {
        name: loginUser.name,
        email: loginUser.email,
        phone: loginUser.phone,
        address: loginUser.address,
        role: loginUser.role,
      },
      token,
    });
  } catch (error) {
    console.log(`error in login ${error}`);
    res.status(500).send({
      error,
      success: false,
    });
  }
};

const testController = async (req, res) => {
  return res.send("test route called");
};

// controller function to authorize normal user
const userAuthController = async (req, res) => {
  return res.status(200).send({
    message: "access granted",
    success: true,
    ok: true,
  });
};
// controller function to authorize admin
const adminAuthController = async (req, res) => {
  return res.status(200).send({
    message: "access granted",
    success: true,
    ok: true,
  });
};

const forgotPasswordController = async (req, res) => {
  try {
    //get details from request body
    const { email, answer, newPassword } = req.body;
    //validation
    if (!email) {
      return res.status(404).send({
        message: "email is required",
        success: false,
      });
    }
    if (!answer) {
      return res.status(404).send({
        message: "answer is required",
        success: false,
      });
    }
    if (!newPassword) {
      return res.status(404).send({
        message: "newPassword is required",
        success: false,
      });
    }

    //find user based on email
    const getUser = await user.findOne({ email, answer });

    //check user existance
    if (!getUser) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);

    //update password
    const updatePassword = await user.findByIdAndUpdate(getUser._id, {
      password: hashed,
    });

    const { password, ...updatedUser } = updatePassword;

    return res.status(200).send({
      message: "Password update successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log("error in forgot password", error);
    return res.status(500).send({
      message: "something went wrong in",
      success: false,
      error,
    });
  }
};

//export
export {
  registerController,
  loginController,
  userAuthController,
  testController,
  forgotPasswordController,
  adminAuthController,
};
