import { Context } from "koa";
import db from "../database";
import { Http400BadRequest, Http404NotFound } from "../exceptions";

export let getAll = async (context: Context, idStr?: string) => {
  // I don't expect users to have a huge number of services, so it should
  // be ok to all of them, at least for now.
  context.body = await db.services.all();
};

export let getOne = async (context: Context, idStr: string) => {
  const id: number = parseInt(idStr);
  if (isNaN(id)) {
    throw new Http400BadRequest({
      errorMessage: `Invalid ID: ${idStr}.`
    });
  }
  context.body = await db.services.findById(id);
};

interface PostServiceBody {
  url?: string;
  indexName?: string;
  typeName?: string;
}

function validateInput(input: any, errorMessage: any) {
  if (!input) {
    throw new Http400BadRequest({
      errorMessage: errorMessage
    });
  }
}

function validateService(body: any) {
  validateInput(body, "No request body.");
  validateInput(body.url, "Field 'url' is not specified.");
  validateInput(body.indexName, "Field 'indexName' is not specified.");
  validateInput(body.typeName, "Field 'typeName' is not specified.");
}

export let post = async (context: Context) => {
  const body = <PostServiceBody>context.request.body;

  // Ensure the input is valid.
  validateService(body);

  // Create the new service and return it to the caller.
  context.status = 201;
  context.body = await db.services.create({
    url: body.url,
    indexName: body.indexName,
    typeName: body.typeName
  });
};

export let put = async (context: Context, idStr: string) => {
  const id: number = parseInt(idStr);
  if (isNaN(id)) {
    throw new Http400BadRequest({
      errorMessage: `Invalid ID: ${idStr}.`
    });
  }

  const body = <PostServiceBody>context.request.body;
  // Ensure the input is valid.
  validateService(body);

  // Retrieve the service and update it.
  const service = await db.services.findById(id);
  if (!service) {
    throw new Http404NotFound({
      errorMessage: `No service with ID: ${id}.`
    });
  }

  service.url = body.url;
  service.indexName = body.indexName;
  service.typeName = body.typeName;

  // Update the service and return the result.
  context.status = 200;
  context.body = await service.save();
};
