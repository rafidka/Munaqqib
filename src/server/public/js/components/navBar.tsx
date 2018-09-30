import React from "react";

export function NavBar() {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        Munaqqib Admin
      </a>
      <input
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
    </nav>
  );
}
