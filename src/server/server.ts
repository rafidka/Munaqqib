import { setup } from "../setup";
setup();

// Koa imports
import Koa, { Context } from "koa";
import Application = require("koa");
import route from "koa-route";
import mount = require("koa-mount");
import serve from "koa-static";
import BodyParser from "koa-bodyparser";

// Munaqqibi imports
import * as homeCtrl from "./controllers/home";
import * as servicesCtrl from "./apicontrollers/services";
import { LocalsObject, Options, default as pug } from "pug";
import * as path from "path";
import { Http400BadRequest, Http404NotFound } from "../exceptions";

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
  app.use(async (context: Context, next: () => Promise<any>) => {
    addPugSupportToContext(<PugContext>context);
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
 * Add's koa-bodyparser to the app so requests' bodies are parsed automatically.
 */
function addBodyParser(app: Application) {
  app.use(BodyParser());
}

function addErrorHandler(app: Application) {
  app.use(async (context: Context, next: () => Promise<any>) => {
    addPugSupportToContext(<PugContext>context);
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
  app.use(route.post("/apis/services", servicesCtrl.post));
  app.use(route.put("/apis/services/:id", servicesCtrl.put));
  app.use(route.get("/apis/services", servicesCtrl.getAll));
  app.use(route.get("/apis/services/:id", servicesCtrl.getOne));
  app.use(route.get("/", homeCtrl.index));
}

function registerStatic(app: Application) {
  app.use(mount("/public", serve(PUBLIC_PATH)));
}

const app = new Koa();
addErrorHandler(app);
addBodyParser(app);
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

