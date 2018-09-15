import { Context } from "koa";
import db from "../../daemon/database";
import { Http400Error } from "../../exceptions";

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

function validateInput(input: any, errorMessage: any) {
  if (!input) {
    throw new Http400Error({
      errorMessage: errorMessage
    });
  }
}

export let post = async (context: Context) => {
  const body = <PostServiceBody>context.request.body;
  validateInput(body, "No request body.");
  validateInput(body.url, "Field 'url' is not specified");
  validateInput(body.indexName, "Field 'indexName' is not specified");
  validateInput(body.typeName, "Field 'typeName' is not specified");

  // Create the new service and return it to the caller.
  context.body = await db.services.create({
    url: body.url,
    indexName: body.indexName,
    typeName: body.typeName,
  });
};
