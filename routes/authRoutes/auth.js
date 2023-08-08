import express from "express";
import {
  registerController,
  loginController,
  userAuthController,
  testController,
  forgotPasswordController,
  adminAuthController,
} from "../../controllers/authController/auth.js";
import { requireSignin, isAdmin } from "../../middlewares/authMiddleware.js";

// router object
const router = express.Router();

//Routing
//REGISTER -- METHOD POST
router.post("/register", registerController);

//LOGIN -- METHOD POST
router.post("/login", loginController);

router.post("/forgotPassword", forgotPasswordController);
//test routes
router.get("/test", requireSignin, isAdmin, testController);

//protected User routes
router.get("/user-auth", requireSignin, userAuthController);

//protected Admin routes
router.get("/admin-auth", requireSignin, isAdmin, adminAuthController);

//export
export default router;
