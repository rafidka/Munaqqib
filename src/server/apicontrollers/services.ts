import { Context } from "koa";
import db from "../../daemon/database";

export let get = async (context: Context) => {
  // I don't expect users to have a huge number of services, so it should
  // be ok to all of them, at least for now.
  context.body = await db.services.all();
};

interface PostServiceBody {
  url?: string;
  indexName?: string;
  typeName?: string;
}

export let post = async (context: Context) => {
  const body = <PostServiceBody>context.request.body;
  if (!body) {
    context.response.status = 400;
    context.body = "Invalid request";
    return;
  }
  if (!body.url) {
    context.response.status = 400;
    context.body = "Field 'url' is not specified";
    return;
  }
  if (!body.indexName) {
    context.response.status = 400;
    context.body = "Field 'indexName' is not specified";
    return;
  }
  if (!body.typeName) {
    context.response.status = 400;
    context.body = "Field 'typeName' is not specified";
    return;
  }

  // Create the new service and return it to the caller.
  context.body = await db.services.create({
    url: body.url,
    indexName: body.indexName,
    typeName: body.typeName,
  });
};
