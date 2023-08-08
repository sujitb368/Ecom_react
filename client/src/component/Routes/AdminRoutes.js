import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";
import axios from "axios";

function AdminRoutes() {
  const [ok, setOk] = useState(false);
  const baseURL = "http://localhost:8080/api/v1/auth";

  const localAuth = JSON.parse(localStorage.getItem("auth"));
  const user = localAuth.user;
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${baseURL}/admin-auth`,

        {
          headers: {
            Authorization: localAuth.token,
          },
        }
      );
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

export default AdminRoutes;
