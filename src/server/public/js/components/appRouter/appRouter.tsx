import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { PAGES, Page } from "../../constants";

export class AppRouter extends React.Component {
  render() {
    return (
      <Fragment>
        <Switch>
          {Object.keys(PAGES).map((tabKey: string) => {
            const tab: Page = PAGES[tabKey];
            return (
              <Route
                key={tabKey}
                path={tab.path}
                exact={true}
                component={tab.component}
              />
            );
          })}
          <Route render={() => <div>Invalid page URL.</div>} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    );
  }
}
