import { createStyles, Theme } from "@material-ui/core/styles";

const navMenuWidth = 240;

export default (theme: Theme) =>
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
