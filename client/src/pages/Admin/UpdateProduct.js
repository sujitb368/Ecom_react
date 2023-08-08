import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import AdminMenu from "../../component/Layout/AdminMenu";

function UpdateProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState();

  const localAuth = JSON.parse(localStorage.getItem("auth"));
  const baseURL = "http://localhost:8080/api/v1";

  //get all categories
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${baseURL}/product/getSingle-product/${params.slug}`
      );
      if (data?.success) {
        // setCategories(data?.products.category);
        setName(data?.products.name);
        setDescription(data?.products.description);
        setPrice(data?.products.price);
        setQuantity(data?.products.quantity);
        setShipping(data?.products.shipping);
        setId(data?.products._id);
        setCategory(data?.products.category._id);
      }
    } catch (error) {
      console.log(`error in getting all categories ${error}`);
    }
  };
  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      console.log(name, description, price, quantity, category);
      const { data } = await axios.put(
        `${baseURL}/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: localAuth.token,
          },
        }
      );
      if (data?.success) {
        console.log("created");
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(`error in handelProduct function ${error}`);
    }
  };

  const handelDelete = async () => {
    try {
      const answer = window.prompt("Are you sure to delete this product..?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${baseURL}/product/delete-Product/${id}`,
        {
          headers: {
            Authorization: localAuth.token,
          },
        }
      );
      toast.success("Product delete successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(`Error in handelDelete ${error}`);
      toast.error("Something went wrong", error);
    }
  };

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/category/getAll-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getProduct();
    getAllCategory();
  }, []);
  return (
    <Layout>
      <div className="containe-fluid p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="p-3 col-md-9">
            <div className=" col-md-8">
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Product Name:</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Choose categories:</label>

                  <select
                    className="form-select"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    value={category}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Price:</label>
                  <input
                    required
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label className="form-label">photo:</label>
                  <input
                    required
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    className="form-control"
                  />
                </div>

                {photo ? (
                  <div className="d-flex justify-content-center">
                    {" "}
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product"
                      accept="image/*"
                      className="p-3"
                      height="200px"
                    />
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <img
                      src={
                        id ? `${baseURL}/product/getPhoto-Product/${id}` : ""
                      }
                      alt="product"
                      accept="image/*"
                      className="p-3"
                      height="200px"
                    />
                  </div>
                )}
                <div className="mb-3 col-md-6">
                  <label className="form-label">Product Description:</label>
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="mb-3 col-md-6">
                  <label className="form-label">Quantity:</label>
                  <input
                    required
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    id="name"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">shipping:</label>
                  <select
                    onChange={(e) => {
                      setShipping(e.target.value);
                    }}
                    className="form-control"
                    value={shipping ? "yes" : "No"}
                  >
                    <option disabled>Select shipping </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <button
                    onClick={handelUpdate}
                    className="btn btn-primary me-2 mb-2"
                  >
                    Update Submit
                  </button>
                  <button
                    onClick={handelDelete}
                    className="btn btn-danger mb-2"
                  >
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
