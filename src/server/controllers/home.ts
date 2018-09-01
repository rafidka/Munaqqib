import { PugContext } from "../main";

export let index = async (context: PugContext) => {
  context.renderPugView("home", {title: "Munaqqib User"});
};
