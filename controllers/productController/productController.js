import express from "express";
import ProductModel from "../../models/productModel/ProductModel.js";
import slugify from "slugify";
import fs from "fs";
import mongoose from "mongoose";

const cretateProductController = async (req, res) => {
  try {
    const { name, description, price, category, shipping, quantity } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const product = new ProductModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    return res.status(201).send({
      message: "product create successfully",
      success: true,
      product,
    });
  } catch (error) {
    console.log(`error in cretateProductController ${error}`);
    res.status(500).send({
      message: "Error in create Product Controller",
      error,
    });
  }
};

//get all products
const getAllProductsController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    return res.status(200).send({
      message: "list of product",
      success: true,
      productCounts: products.length,
      products,
    });
  } catch (error) {
    console.log(`error in getAllProductsController ${error}`);
    res.status(500).send({
      message: "Error while getting products",
      error,
    });
  }
};

//get single product
const getSingleProductController = async (req, res) => {
  try {
    const products = await ProductModel.findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");
    return res.status(200).send({
      message: "single product",
      success: true,
      products,
    });
  } catch (error) {
    console.log(`error in getSingleProductController ${error}`);
    res.status(500).send({
      message: "Error while getting single product",
      error,
    });
  }
};

// get photo
const productPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete product
const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

export {
  cretateProductController,
  getAllProductsController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
};
