import React from "react";
import { connect } from "react-redux";

class Services extends React.Component {
  render() {
    return <div>This is the services page.</div>;
  }
}

const mapStateToProps = (state: any) => {
  return state;
};

const reduxComp = connect(
  mapStateToProps,
  {}
)(Services);

export { reduxComp as Services };
