import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAppState } from "src/state";
import { ILayoutAction, toggleNavMenu } from "./actions";

import { withRouter } from "react-router";
import Layout from "./component";
import { ILayoutState } from "./state";
import styles from "./styles";

function mapDispatchToProps(dispatch: Dispatch<ILayoutAction>) {
  return {
    toggleNavMenu: () => dispatch(toggleNavMenu())
  };
}

function mapStateToProps(state: IAppState): { layout: ILayoutState } {
  return { layout: state.layout };
}

const reduxComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Layout));

const comp = withRouter<any>(reduxComp);

export { comp as Layout, ILayoutState };
