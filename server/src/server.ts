import { setup } from "./setup";
import { Http400BadRequest, Http404NotFound } from "./exceptions";
setup();

// Koa imports
import Koa, { Context } from "koa";
import Application = require("koa");
import route from "koa-route";
const render = require("koa-ejs");
import BodyParser from "koa-bodyparser";

// Munaqqibi imports
import * as homeCtrl from "./controllers/home";
import * as servicesCtrl from "./apicontrollers/services";
import * as path from "path";

// Full URL of the 'views' directory.
const VIEWS_PATH = path.join(__dirname, "views");
// Full URL of the 'dist/static' directory.
const PUBLIC_PATH = path.join(__dirname, "public");
console.log(PUBLIC_PATH);
// Port on which the server should run.
const PORT = process.env.PORT || 3000;

/**
 * Extends the {@link Context} class to add a definition for the render()
 * function from koa-ejs plugin.
 */
export interface MunaqqibContext extends Context {
  render(viewName: string, options?: any): Promise<string | void>;
}

/**
 * Adds support for rendering .ejs views. This adds a function render() to
 * the application context which can be used to render .ejs views.
 *
 * @param {Application} app The {@link Application} instance to add the error
 * handling layer to.
 */
function addEjsSupport(app: Application) {
  const debug = process.env.NODE_ENV === "production";
  render(app, {
    root: VIEWS_PATH,
    layout: false,
    viewExt: "ejs",
    cache: false,
    writeResp: true, // Whether render() automatically writes the response
    debug
  });
}

/**
 * Adds koa-bodyparser to the app so requests' bodies are parsed automatically.
 */
function addBodyParser(app: Application) {
  app.use(BodyParser());
}

/**
 * Adds a layer for handling HTTP exceptions that need to be translated into
 * specific HTTP error responses. For example, if an API throws a
 * {@link Http400BadRequest}, an HTTP 400 error code should be returned,
 * instead of letting Node handles the exception and translates it as
 * HTTP 500 Internal Error.
 *
 * @param {Application} app The {@link Application} instance to add the error
 * handling layer to.
 */
function addErrorHandler(app: Application) {
  app.use(async (context: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      if (err instanceof Http400BadRequest) {
        const casted = <Http400BadRequest>err;
        context.body = casted.responseBody;
        context.response.status = 400;
        return;
      } else if (err instanceof Http404NotFound) {
        const casted = <Http404NotFound>err;
        context.body = casted.responseBody;
        context.response.status = 404;
        return;
      }
      throw err;
    }
  });
}

/**
 * Registers the controllers.
 * @param {Application} app The {@link Application} instance to register the
 * controllers on.
 */
function registerControllers(app: Application) {
  app.use(route.post("/api/services", servicesCtrl.post));
  app.use(route.put("/api/services/:id", servicesCtrl.put));
  app.use(route.get("/api/services", servicesCtrl.getAll));
  app.use(route.get("/api/services/:id", servicesCtrl.getOne));
  app.use(route.get("/", homeCtrl.index));
}

const app = new Koa();
addErrorHandler(app);
addBodyParser(app);
addEjsSupport(app);
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
