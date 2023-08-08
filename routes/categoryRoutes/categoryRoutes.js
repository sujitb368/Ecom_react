import express from "express";
import { isAdmin, requireSignin } from "../../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../../controllers/categoryController/categoryController.js";

const routes = express.Router();

//routes
routes.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);
//update category
routes.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);
//get all category
routes.get("/getAll-category", categoryControlller);
//get all category
routes.get("/getSingle-category/:slug", singleCategoryController);
//delete category
routes.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);

export default routes;
