import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { connect } from "react-redux";
import { AppRouter } from "../../AppRouter";
import NavMenu from "../../NavMenu";
import { IMunaqqibState } from "../../store";
import { LAYOUT_ACTION } from "./reducer";

const navMenuWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      marginLeft: navMenuWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${navMenuWidth}px)`
      }
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3
    },
    navMenu: {
      [theme.breakpoints.up("sm")]: {
        flexShrink: 0,
        width: navMenuWidth
      }
    },
    navMenuButton: {
      marginRight: 20,
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    navMenuPaper: {
      width: navMenuWidth
    },
    root: {
      display: "flex"
    },
    toolbar: theme.mixins.toolbar
  });

class Layout extends React.Component<any> {
  public render() {
    const { classes, theme } = this.props;

    // tslint:disable-next-line:no-console
    console.log("Logging this.props: ", this.props);

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open menu"
              onClick={this.props.toggleNavMenu}
              className={classes.navMenuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap={true}>
              Page Title
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.navMenu}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp={true} implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.props.isNavMenuVisible}
              onClose={this.props.toggleNavMenu}
              classes={{
                paper: classes.navMenuPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <NavMenu />
            </Drawer>
          </Hidden>
          <Hidden xsDown={true} implementation="css">
            <Drawer
              classes={{
                paper: classes.navMenuPaper
              }}
              variant="permanent"
              open={true}
            >
              <NavMenu />
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <AppRouter />
        </main>
      </div>
    );
  }
}

function showNavMenu() {
  return {
    type: LAYOUT_ACTION.SHOW_NAV_MENU
  };
}

function hideNavMenu() {
  return {
    type: LAYOUT_ACTION.HIDE_NAV_MENU
  };
}

function toggleNavMenu() {
  return {
    type: LAYOUT_ACTION.TOGGLE_NAV_MENU
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    hideNavMenu: () => dispatch(hideNavMenu()),
    showNavMenu: () => dispatch(showNavMenu()),
    toggleNavMenu: () => dispatch(toggleNavMenu())
  };
};
const mapStateToProps = (state: IMunaqqibState) => {
  return state.layout;
};

const reduxComp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Layout));

export default reduxComp;
