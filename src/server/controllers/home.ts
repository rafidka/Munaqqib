import { PugContext } from "../server";

export let index = async (context: PugContext) => {
  context.renderPugView("home", {title: "User"});
};
