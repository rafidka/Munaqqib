import { PugContext } from "../server";
import { Context } from "koa";

export let index = async (context: Context) => {
  const pugContext = <PugContext>context;
  pugContext.renderPugView("home", {title: "User"});
};
