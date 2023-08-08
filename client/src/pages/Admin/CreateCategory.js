import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";

import axios from "axios";
import { toast } from "react-hot-toast";

function CreateCategory() {
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState();
  const [id, setId] = useState();
  const [showModal, setShowModal] = useState(false);

  const localAuth = JSON.parse(localStorage.getItem("auth"));
  const baseURL = "http://localhost:8080/api/v1/category";

  //get all categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/getAll-category`);
      if (response?.data?.success) {
        console.log("response?.data", response?.data?.category);
        setCategories(response?.data?.category);
      }
    } catch (error) {
      console.log(`error in getting all categories ${error}`);
    }
  };

  const handelCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseURL}/create-category`,
        {
          name: category,
        },
        {
          headers: {
            Authorization: localAuth.token,
          },
        }
      );
      if (data.success) {
        toast.success("Category crated successfully");
        getAllCategories();
      }
    } catch (error) {
      console.log(`error in handelCategory ${error}`);
      toast.error("Something went wrong unable to create prodict");
    }
  };

  //delete category
  const handelDelete = async (pid) => {
    try {
      const response = await axios.delete(`${baseURL}/delete-category/${pid}`, {
        headers: {
          Authorization: localAuth.token,
        },
      });
      if (response?.data?.success) {
        toast.success("Category deleted");
        getAllCategories();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(`error in handelDelete${error}`);
    }
  };

  const handelEdit = (pid) => {
    try {
      setId(pid);
      setShowModal(true);
      console.log(showModal);
    } catch (error) {
      console.log(`erron in handeledit ${error}`);
    }
  };

  const handelUpdate = async () => {
    try {
      const { data } = await axios.put(
        `${baseURL}/update-category/${id}`,
        {
          name: category,
        },
        {
          headers: {
            Authorization: localAuth.token,
          },
        }
      );
      if (data?.success) {
        toast.success("Category Updated");
        setShowModal(false);
        getAllCategories();
      }
    } catch (error) {
      console.log(`error in handelUpdate ${error}`);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <div className="containe-fluid p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card col-md-6">
              <div className="card-header">Create Category :</div>
              <div className="card-body">
                <form onSubmit={handelCategory}>
                  <div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="enter a category"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <button type="submit" className="btn btn-primary mt-3">
                        Create Category
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* display category  */}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td>
                        <button
                          key={c._id + "Edit"}
                          className="btn btn-primary me-2"
                          onClick={() => {
                            handelEdit(c._id);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          key={c._id + "Delete"}
                          onClick={() => {
                            handelDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className={`modal ${showModal ? "show" : ""}`}
          tabIndex={-1}
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Category:</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setShowModal(false);
                  }}
                />
              </div>
              <div className="modal-body">
                <form>
                  <div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="enter a category"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Close
                </button>
                <button
                  onClick={handelUpdate}
                  type="button"
                  className="btn btn-primary"
                  id="updateButton"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default CreateCategory;
