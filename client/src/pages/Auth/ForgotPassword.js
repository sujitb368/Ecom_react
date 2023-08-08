import React, { useState } from "react";
import Layout from "../../component/Layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [answer, setAnswer] = useState("");

  const baseURL = "http://localhost:8080/api/v1/auth";

  const navigate = useNavigate();

  const handelForgot = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${baseURL}/forgotPassword`, {
        email,
        newPassword,
        answer,
      });

      if (response) {
        console.log("response from forgot password");
        toast.success("password changed please login");
        navigate("/login");
      }
    } catch (error) {
      console.log("error in forgot password", error);
    }
  };
  return (
    <>
      <Layout>
        <div className="container col-md-4 mt-5 shadow p-3 rounded">
          <h2 className="text-primary text-center mb-3 border-bottom pb-2">
            Login Form
          </h2>
          <form className="p-2" onSubmit={handelForgot}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password:</label>
              <input
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Enter your favorite sports:</label>
              <input
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div>
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default ForgotPassword;
