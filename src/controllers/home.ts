import { PugContext } from "../app";

export let index = async (context: PugContext) => {
  context.renderPugView("home", {title: "Munaqqib User"});
};
