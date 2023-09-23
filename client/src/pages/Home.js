import React, { useEffect, useState } from "react";
import Layout from "../component/Layout/Layout";
import { useAuth } from "../context/auth.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Prices } from "../component/Price";
function Home() {
  const [auth, setAuth] = useAuth();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const baseURL = "http://localhost:8080/api/v1";

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/product/getAll-products`);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(`Error in getAll products ${error}`);
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

  //handelCheck
  const handelCheck = (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((c) => c !== id);
      }
      setChecked(all);
    } catch (error) {
      console.log("error in handelCheck", error);
      toast.success("something went wrong", error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  return (
    <>
      <Layout title={"All Product - Best Offers"}>
        <div className="container-fluid row ">
          <div className=" col-md-3 pt-3">
            <div className="d-flex flex-column">
              <h2 className="">Filter By Category</h2>

              {categories.map((cat) => (
                <>
                  <div key={cat._id}>
                    <input
                      onChange={(e) => handelCheck(e.target.checked, cat._id)}
                      type="checkbox"
                    />
                    {cat.name}
                  </div>
                </>
              ))}
            </div>
            {JSON.stringify(checked)}
            <div className="d-flex flex-column">
              <h2 className="">Filter By Price</h2>
              {Prices.map((price) => (
                <>
                  <div key={price.id}>
                    <input
                      onChange={(e) => {
                        setRadio(e.target.checked);
                      }}
                      type="radio"
                      className="me-1"
                      name="filterPrice"
                    />
                    {price.price}
                  </div>
                </>
              ))}
            </div>
            {JSON.stringify(radio)}
          </div>
          <div className="col-md-9 row py-5">
            {/* product cards */}
            {products?.map((product) => (
              <Link
                key={product._id}
                to={`/dashboard/admin/product/${product.slug}`}
                style={{ width: "18rem" }}
                className="text-decoration-none"
              >
                <div className="card  me-2 mb-2 p-0">
                  <img
                    src={`${baseURL}/product/getPhoto-Product/${product._id}`}
                    className="card-img-top product-img"
                    alt="..."
                  />

                  <div className="card-body">
                    <h5 className="card-title">{product.name.toUpperCase()}</h5>
                    <h6 className="card-title">&#8377; {product.price}</h6>
                    <button className="btn btn-primary me-1">Buy Now</button>
                    <button className="btn btn-primary me-1">
                      Add to Cart
                    </button>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
