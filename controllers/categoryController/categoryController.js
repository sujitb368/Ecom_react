import slugify from "slugify";
import categoryModel from "../../models/categoryModel/categoryModel.js";

//function to create category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    //validation for name
    if (!name) {
      return res
        .status(401)
        .send({ message: "name is require", success: false });
    }
    //check is category already exist
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      // return if category exist
      return res.status(200).send({
        message: "Category already exist",
        success: false,
      });
    }
    //save category
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    //final api response
    return res.status(201).send({
      message: "category create successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(`error in createCategoryController ${error}`);
    res.status(500).send({
      message: "Error in create Category Controller",
      error,
    });
  }
};

//function to update category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    if (!name || !id) {
      return res.status(401).send({
        message: `All filed are necessary! not provided ${
          !name && !id ? "NAME and ID" : !name ? "NAME" : "ID"
        } `,
      });
    }

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    return res.status(200).send({
      message: "update category successfully",
      success: true,
      category,
    });
  } catch (error) {
    console.log(
      `error while updating category in updateCategoryController ${error}`
    );
    return res.status(500).send({
      message: "Error while updating Category",
      error,
    });
  }
};

//function to get all category
const categoryControlller = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(200).send({
      message: "All category list",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};
//function to get single category
const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    return res.status(200).send({
      message: "get single product",
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting single categories",
    });
  }
};
//function to delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id => ", id);
    const category = await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Categry Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category",
    });
  }
};

export {
  createCategoryController,
  updateCategoryController,
  categoryControlller,
  singleCategoryController,
  deleteCategoryController,
};
