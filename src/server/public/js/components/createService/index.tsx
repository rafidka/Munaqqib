import React from "react";
import { connect } from "react-redux";

class CreateService extends React.Component {
  render() {
    return <div>This is the Create Service page.</div>;
  }
}

const mapStateToProps = (state: any) => {
  return state;
};

const reduxComp = connect(
  mapStateToProps,
  {}
)(CreateService);

export { reduxComp as CreateService };
