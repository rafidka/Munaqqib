import React from "react";
import { NavBar } from "./navBar";
import { Menu } from "./menu";

export function App() {
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <Menu />

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4" />
        </div>
      </div>
    </div>
  );
}
