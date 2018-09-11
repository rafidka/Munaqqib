import _ from "lodash";
import fetch from "node-fetch";
import es from "elasticsearch";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

if (!process.env.ELASTICSEARCH_URL) {
  console.error("ELASTICSEARCH_URL is not defined. Add this value to the " +
    ".env file.");
  process.exit(1);
}

const esClient = new es.Client({
  host: process.env.ELASTICSEARCH_URL,
  log: "warning"
});

/**
 * Pings the ElasticSearch server to check it status.
 * @returns {Promise<boolean>}
 */
export async function checkStatus(): Promise<boolean> {
  return await esClient.ping({});
}

/**
 * Creates a new index.
 * @param {string} indexName The name of the index to create.
 * @returns {Promise<void>} A promise for async programming.
 */
async function createIndex(indexName: string) {
  const exists = await esClient.indices.exists({
    index: indexName,
  });
  if (exists === true) {
    console.info(`Index ${indexName} already exists. No need to create it.`);
    return;
  }
  const response = await esClient.indices.create({
    index: indexName,
  });
  console.log("createIndex() finished with the response:");
  console.dir(response);
}

/**
 * Deletes an index.
 * @param {string} indexName The name of the index to delete.
 * @returns {Promise<void>} A promise for async programming.
 */
async function deleteIndex(indexName: string) {
  const exists = await esClient.indices.exists({
    index: indexName,
  });
  if (exists !== true) {
    console.info(`Index ${indexName} doesn't exist. No action was taken.`);
    return;
  }
  const response = await esClient.indices.delete({
    index: indexName
  });
  console.log("deleteIndex() finished with the response:");
  console.dir(response);
}

/**
 * An interface used to define types (mappings) in ElasticSearch indices.
 */
interface TypeDefinition {
  fields: { [fieldName: string]: FieldDefinition };
}

/**
 * A class specifying the definition
 */
interface FieldDefinition {
  name: string;
  analyzer?: string;
  type: "integer" | "date";
}

function fieldDefToElasticSearchField(fieldDef: FieldDefinition) {
  const def: any = {
    type: fieldDef.type,
  };
  if (fieldDef.analyzer) {
    def.analyzer = fieldDef.analyzer;
    def.search_analyzer = fieldDef.analyzer;
  }
  return def;
}

/**
 * Creates a document type under a certain index.
 * @param {string} indexName The document to create the type under.
 * @param {string} typeName The name of the type.
 * @param {TypeDefinition} typeDef The definition of the type.
 * @returns {Promise<void>} A promise for async programming.
 */
async function createDocumentType(indexName: string, typeName: string,
                                  typeDef: TypeDefinition) {
  const props = _.mapValues(typeDef.fields,
      d => fieldDefToElasticSearchField(d));
  const response = await esClient.indices.putMapping({
    index: indexName,
    type: typeName,
    body: {
      properties: props
    }
  });
}

/**
 * Sends a document to ElasticSearch for indexing.
 * @param {string} indexName The index to use.
 * @param {string} typeName The type of the document. This corresponds to a type
 * under the given index name in Elastic Search.
 * @param document The document to be indexed.
 * @returns {Promise<void>}
 */
async function indexDocument(indexName: string, typeName: string, document: any) {
  await esClient.index({
    index: indexName,
    type: typeName,
    id: document.id,
    body: document
  });
}

/**
 * Searches for documents matching the given query.
 * @param {string} indexName The index to search under.
 * @param {string} typeName The document to search for.
 * @param {string} query The search query.
 * @returns {Promise<any[]>} The matching documents.
 */
async function search(indexName: string, typeName: string,
                      query: string): Promise<any[]> {
  const response = await esClient.search<any>({
    index: indexName,
    type: typeName,
    q: query
  });
  return response.hits.hits;
}

async function fetchHadiths(url: string, count: number, startDate: Date) {
  const response = await fetch(url);
  console.dir(`fetchHadiths() response is ${response}`);
}

async function doWork() {
  const INDEX_NAME = "default";
  const TYPE_NAME = "hadiths";
  /*await deleteIndex(INDEX_NAME);
  await createIndex(INDEX_NAME);
  await setType(INDEX_NAME, TYPE_NAME);
  await indexDocument(INDEX_NAME, TYPE_NAME, {
    "id": 1428,
    "text": "أَلَآ إِنَّ أَوْلِيَآءَ ٱللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    "added_on": "2017-02-20T23:05:07.730403Z",
    "updated_on": "2017-08-21T01:30:06.936861Z",
  });*/
  await search(INDEX_NAME, TYPE_NAME, "هم");
}

doWork();
