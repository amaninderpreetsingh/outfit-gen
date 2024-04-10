import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  console.log("data-------------------------------------------------");
  const data = JSON.parse(event.body);
  const params = {
    TableName: "Wardrobe",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      itemId: uuid.v1(),
      type: data.type,
      color: data.color,
      createdAt: Date.now(),
      url: data.url
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
