import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { AppRouter } from "./Components/AppRouter";
import { NavMenu } from "./Components/NavMenu";

export default class Layout extends React.Component<any> {
  public render() {
    const { classes, theme, layout } = this.props;

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
              open={layout.isNavMenuVisible}
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
