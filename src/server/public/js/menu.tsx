import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PAGES, Page } from "./constants";

class Menu extends React.Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            {Object.keys(PAGES).map((tabKey: string) => {
              const tab: Page = PAGES[tabKey];

              return (
                <li className="nav-item" key={tab.name}>
                  <NavLink to={tab.path} activeStyle={{ fontWeight: "bold" }}>
                    <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                    {tab.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: any) => {
  return state;
};

const reduxComp = connect(
  mapStateToProps,
  {}
)(Menu);

export { reduxComp as Menu };
