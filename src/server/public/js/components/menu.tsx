import React from "react";

export function Menu() {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              <span data-feather="home" />
              Services <span className="sr-only">(current)</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
