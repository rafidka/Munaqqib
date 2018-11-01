import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import * as React from "react";
import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CreateService } from "./Pages/CreateService";
import { Home } from "./Pages/Home";

export interface IPage {
  name: string;
  icon: any;
  path: string;
  component: any;
}

// tslint:disable:object-literal-sort-keys
export const PAGES: { [id: string]: IPage } = {
  HOME: {
    component: Home,
    icon: <HomeIcon />,
    name: "Home",
    path: "/"
  },
  CREATE_SERVICE: {
    component: CreateService,
    icon: <CreateIcon />,
    name: "Create Service",
    path: "/create-service"
  }
};
// tslint:enable:object-literal-sort-keys

export class AppRouter extends React.Component {
  public render() {
    return (
      <Fragment>
        <Switch>
          {Object.keys(PAGES).map((tabKey: string) => {
            const page: IPage = PAGES[tabKey];
            return (
              <Route
                key={tabKey}
                path={page.path}
                exact={true}
                component={page.component}
              />
            );
          })}
          <Route render={this.invalidPageUrl} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  }

  private invalidPageUrl() {
    return <div>Invalid page URL.</div>;
  }
}
