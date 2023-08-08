import React from "react";
import Layout from "../component/Layout/Layout";
import { Link } from "react-router-dom";
function Pagenotfound() {
  return (
    <>
      <Layout title={"Go back - page not found"}>
        <div className="pnf">
          <h1>404</h1>
          <h2 className="pnf-msg">opps! page not found</h2>
          <button className="btn btn-danger">
            <Link className="pnf-button" to="/">
              Go To Home
            </Link>
          </button>
        </div>
      </Layout>
    </>
  );
}

export default Pagenotfound;
