import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="footer bg-dark text-center text-light p-3">
        <h2>All Right Reserved &copy; Ecom</h2>
        <p>
          <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
          <Link to="privacy">Privacy</Link>|
          <Link to="terms">Terms and condition</Link>
        </p>
      </div>
    </>
  );
}

export default Footer;
