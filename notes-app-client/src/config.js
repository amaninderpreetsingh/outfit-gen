export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
      REGION: "us-east-1",
      BUCKET: "clothes-outfitgen"
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://yy200qnifj.execute-api.us-east-1.amazonaws.com"
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_HqNJwmIjF",
      APP_CLIENT_ID: "22r29nde4j4mnk7g79klqeqp9q",
      IDENTITY_POOL_ID: "us-east-1:cee70a74-1354-49ce-bf89-4d038e703797"
    }
  };
  