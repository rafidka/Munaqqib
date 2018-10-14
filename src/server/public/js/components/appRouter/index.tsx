import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { TABS, Tab } from "../../constants";

export class AppRouter extends React.Component {
  render() {
    return (
      <Fragment>
        <Switch>
          {Object.keys(TABS).map((tabKey: string) => {
            const tab: Tab = TABS[tabKey];
            return (
              <Route
                key={tabKey}
                path={tab.path}
                exact={true}
                component={tab.component}
              />
            );
          })}
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  }
}
