import * as React from "react";
import { Fragment } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IPage, PAGES } from "../pages";

export class AppRouter extends React.Component<any> {
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
