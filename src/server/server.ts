// Koa imports
import Koa, { Context } from "koa";
import Application = require("koa");
import route from "koa-route";
import mount = require("koa-mount");
import serve from "koa-static";


import dotenv from "dotenv";
import * as homeCtrl from "./controllers/home";
import * as userApiCtrl from "./apicontrollers/user";
import { LocalsObject, Options, default as pug } from "pug";
import * as path from "path";
import sourceMapSupport from "source-map-support";

// Install source map support so errors happening while executing bundle.js
// can be mapped to actual source code
sourceMapSupport.install();

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: ".env"});

// Full URL of the 'views' directory.
const VIEWS_PATH = path.join(__dirname, "views");
// Full URL of the 'dist/static' directory.
const PUBLIC_PATH = path.join(__dirname, "public");
console.log(PUBLIC_PATH);
// Port on which the server should run.
const PORT = process.env.PORT || 3000;

/**
 * Extends the {@link Context} class to add a function for rendering PUG views.
 */
export interface PugContext extends Context {
  renderPugView(viewName: string, options: Options & LocalsObject): void;
}

/**
 * Adds a middleware that injects a function for rendering PUG views.
 * @param {Application} app The {@link Application} instance to add the
 * middleware to.
 */
export function addPugSupport(app: Application) {
  app.use(async (context: PugContext, next: () => Promise<any>) => {
    addPugSupportToContext(context);
    await next();
  });
}

/**
 * Adds a function for rendering PUG views to the given {@link PugContext}.
 * @param {PugContext} context The context to add the function to.
 */
export function addPugSupportToContext(context: PugContext) {
  context.renderPugView = (viewName: string, options: Options & LocalsObject) => {
    const viewPath = path.join(VIEWS_PATH, viewName + ".pug");
    context.body = pug.renderFile(viewPath, options);
  };
}

/**
 * Registers the controllers.
 * @param {Application} app The {@link Application} instance to register the
 * controllers on.
 */
function registerControllers(app: Application) {
  app.use(route.get("/apis/user", userApiCtrl.index));
  app.use(route.get("/", homeCtrl.index));
}

function registerStatic(app: Application) {
  app.use(mount("/public", serve(PUBLIC_PATH)));
}

const app = new Koa();
addPugSupport(app);
registerStatic(app);
registerControllers(app);

const server = app.listen(PORT, () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    PORT,
    "development"
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;

