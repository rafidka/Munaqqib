import React from "react";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    return <div>This is the home page.</div>;
  }
}

const mapStateToProps = (state: any) => {
  return state;
};

const reduxComp = connect(
  mapStateToProps,
  {}
)(Home);

export { reduxComp as Home };
