import React from "react";
import Layout from "../../../component/Layout/Layout";
import UserMenu from "../../../component/Layout/UserMenu";

function Profile() {
  const localAuth = JSON.parse(localStorage.getItem("auth"));
  return (
    <>
      <Layout title={"Profile - Ecom"}>
        <div className="container-fluid">
          <div className="row p-3 mt-3">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-body">
                  <h2>{localAuth.user.name}</h2>
                  <hr />
                  <p>Email: {localAuth.user.email}</p>
                  <p>Address: {localAuth.user.address}</p>
                  <p>Phone: {localAuth.user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Profile;
