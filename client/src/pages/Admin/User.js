import React from "react";
import Layout from "../../component/Layout/Layout";
import AdminMenu from "../../component/Layout/AdminMenu";

function User() {
  return (
    <Layout>
      <div className="containe-fluid p-2">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> All Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default User;
