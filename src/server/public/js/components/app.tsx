import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NavBar } from "./navBar";
import { Menu } from "./menu";
import { AppRouter } from "./appRouter";

export function App() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <div className="container-fluid">
          <div className="row">
            <Menu />

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <AppRouter />
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
