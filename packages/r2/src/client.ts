import { S3Client } from "@aws-sdk/client-s3";
import { getR2Config, getR2Endpoint, type R2Config } from "./env";

export function createR2Client(config: R2Config = getR2Config()): S3Client {
  return new S3Client({
    region: "auto",
    endpoint: getR2Endpoint(config.accountId),
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}
