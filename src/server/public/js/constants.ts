import {
  faServer,
  faPlus,
  faHome,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { Home } from "./components/home";
import { CreateService } from "./components/createService";
import { Services } from "./components/services";

// TODO: Move somewhere else.
export interface Tab {
  name: string;
  path: string;
  icon: IconDefinition;
  component: any;
}

export const TABS: { [id: string]: Tab } = {
  HOME: {
    name: "Home",
    path: "/",
    icon: faHome,
    component: Home
  },
  SERVICES: {
    name: "Services",
    path: "/services",
    icon: faServer,
    component: Services
  },
  CREATE_SERVICE: {
    name: "Create Service",
    path: "/create-service",
    icon: faPlus,
    component: CreateService
  }
};
