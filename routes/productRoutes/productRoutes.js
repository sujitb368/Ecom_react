import express from "express";
import { isAdmin, requireSignin } from "../../middlewares/authMiddleware.js";
import {
  cretateProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
} from "../../controllers/productController/productController.js";
import formidable from "express-formidable";
import ProductModel from "../../models/productModel/ProductModel.js";

//routes
const route = express.Router();

//create product route
route.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  cretateProductController
);

//get all products
route.get("/getAll-Products", getAllProductsController);

//get single  product
route.get("/getSingle-Product/:slug", getSingleProductController);

//remain to add routes and test delete, update, photo controller

//get photo
route.get("/getPhoto-Product/:pid", productPhotoController);

//delete product
route.delete(
  "/delete-Product/:pid",
  requireSignin,
  isAdmin,
  deleteProductController
);

//update product
route.put(
  "/update-Product/:id",
  requireSignin,
  isAdmin,
  formidable(),
  updateProductController
);

export default route;
