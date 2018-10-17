import {
  faServer,
  faPlus,
  faHome,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { Home } from "./pages/home";
import { CreateService } from "./pages/createService";
import { Services } from "./pages/services";

export interface Page {
  name: string;
  path: string;
  icon: IconDefinition;
  component: any;
}

export const PAGES: { [id: string]: Page } = {
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
