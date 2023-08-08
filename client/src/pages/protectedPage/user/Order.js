import React from "react";
import Layout from "../../../component/Layout/Layout";
import UserMenu from "../../../component/Layout/UserMenu";

function Order() {
  return (
    <>
      <Layout title={"Dashboard - Ecom"}>
        <div className="container-fluid">
          <div className="row p-3 mt-3">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9 ">Your orders</div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Order;
