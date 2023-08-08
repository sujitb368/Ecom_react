import React, { useState } from "react";
import Layout from "../../component/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

function Login() {
  console.log("login page");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const baseURL = "http://localhost:8080/api/v1/auth";

  // form function to register user
  const handelLogin = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${baseURL}/login`, {
        email,
        password,
      });

      if (response && response.data.success) {
        toast.success(response.data && response.data.message);
        // setAuth({
        //   ...auth,
        //   user: response.data.user,
        //   token: response.data.token,
        // });
        setAuth(() => {
          return {
            user: response.data.user,
            token: response.data.token,
          };
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate(location.state || "/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong! unable to login");
    }
  };

  return (
    <>
      <Layout title={"login"}>
        <div className="container col-md-4 mt-5 shadow p-3 rounded">
          <h2 className="text-primary text-center mb-3 border-bottom pb-2">
            Login Form
          </h2>
          <form className="p-2" onSubmit={handelLogin}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="form-control"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button
              type="button"
              className="m-2 btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default Login;
