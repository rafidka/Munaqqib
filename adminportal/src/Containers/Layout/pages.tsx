import CreateIcon from "@material-ui/icons/Create";
import HomeIcon from "@material-ui/icons/Home";
import * as React from "react";
import { CreateService } from "../CreateService";
import { Home } from "../Home";

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
