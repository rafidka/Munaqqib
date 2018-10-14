import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TABS, Tab } from "../constants";

class Menu extends React.Component {
  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            {Object.keys(TABS).map((tabKey: string) => {
              const tab: Tab = TABS[tabKey];

              return (
                <li className="nav-item" key={tab.name}>
                  <Link to={tab.path}>
                    <FontAwesomeIcon icon={tab.icon} className="mr-2" />
                    {tab.name}
                  </Link>
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
