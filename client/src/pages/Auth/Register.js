import React, { useState } from "react";
import Layout from "../../component/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [answer, setAnswer] = useState("");

  const baseURL = "http://localhost:8080/api/v1/auth";

  console.log(`base url ${baseURL}`);

  // form function to register user
  const registerUser = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(`${baseURL}/register`, {
        name,
        email,
        phone,
        address,
        password,
        answer,
      });
      console.log("data entered = > ", response);
      toast.success("submited");
    } catch (error) {
      console.log("error in register", error);
      toast.success("something went wrong registration unsuccessfull");
    }
  };
  return (
    <>
      <Layout title="Register">
        <div className="container col-md-6 mt-5 shadow p-3 rounded">
          <h2 className="text-primary text-center mb-3 border-bottom pb-2">
            Registration
          </h2>
          <form className="row" onSubmit={registerUser}>
            <div className="mb-3 col-md-6">
              <label className="form-label">Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 col-md-6">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                className="form-control"
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Password</label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Address</label>
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Phone</label>
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                type="text"
                className="form-control"
                required
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">What is your favorite sports</label>
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

export default Register;
