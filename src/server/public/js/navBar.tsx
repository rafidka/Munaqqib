import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
        Munaqqib Admin
      </Link>
      <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
    </nav>
  );
}
