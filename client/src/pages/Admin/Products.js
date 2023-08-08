import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid row ">
        <div className=" col-md-3">
          <AdminMenu />
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
                  <button className="btn btn-primary me-1">Add to Cart</button>
                  <p className="card-text">{product.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Products;
