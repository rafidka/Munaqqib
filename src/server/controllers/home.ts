import { MunaqqibContext } from "../server";
import { Context } from "koa";

export let index = async (context: Context) => {
  const munaqqibContext = <MunaqqibContext>context;
  await munaqqibContext.render("home");
};
