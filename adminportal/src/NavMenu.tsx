import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { createStyles, Theme, withStyles } from "@material-ui/core";
import * as React from "react";
import { withRouter } from "react-router-dom";
import { IPage, PAGES } from "./AppRouter";

const styles = (theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar
  });

class NavMenu extends React.Component<any> {
  public render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.toolbar}>Munaqqib Admin</div>
        <Divider />
        <List>
          {Object.keys(PAGES).map(pageKey => {
            const page: IPage = PAGES[pageKey];

            return (
              <ListItem
                button={true}
                key={page.name}
                // tslint:disable-next-line:jsx-no-lambda
                onClick={() => this.click(page)}
              >
                <ListItemIcon>{page.icon}</ListItemIcon>
                <ListItemText primary={page.name} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }

  private click(page: IPage) {
    this.props.history.push(page.path);
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(NavMenu));
