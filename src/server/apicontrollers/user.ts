import { Context } from "koa";

export let index = async (context: Context) => {
  context.body = {
    user: "User"
  };
};

