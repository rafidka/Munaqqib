import angular, { IController } from "angular";

const app = angular.module("MunaqqibApp", []);

class MunaqqibCtrl implements IController {
  message = "Hello, World";
}

app.controller("MunaqqibCtrl", MunaqqibCtrl);
