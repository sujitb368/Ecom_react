import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";
import Layout from "../../component/Layout/Layout";

function Private() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const baseURL = "http://localhost:8080/api/v1/auth";

  const localAuth = JSON.parse(localStorage.getItem("auth"));
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${baseURL}/user-auth`, {
        headers: {
          Authorization: localAuth.token,
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (localAuth?.token) {
      authCheck();
    }
  }, []);
  return ok ? <Outlet /> : <Spinner />;
}

export default Private;
