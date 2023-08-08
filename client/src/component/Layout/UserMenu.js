import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div className="text-center p-2">
        <div className="list-group">
          <h4>USER Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/order"
            className="list-group-item list-group-item-action"
          >
            My Orders
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
