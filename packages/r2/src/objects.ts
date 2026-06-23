import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  type PutObjectCommandInput,
  type S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createR2Client } from "./client";
import { getR2Config, type R2Config } from "./env";

const leadingSlashRegex = /^\/+/;
const trailingSlashRegex = /\/+$/g;

export interface R2ObjectKeyOptions {
  fileName: string;
  folder?: string;
}

export interface CreateUploadUrlOptions {
  bucket?: string;
  contentType: string;
  expiresIn?: number;
  key: string;
}

export interface CreateDownloadUrlOptions {
  bucket?: string;
  expiresIn?: number;
  key: string;
}

export interface R2ServiceOptions {
  client?: S3Client;
  config?: R2Config;
}

export function createObjectKey(options: R2ObjectKeyOptions): string {
  const normalizedFolder = options.folder
    ?.replace(leadingSlashRegex, "")
    .replace(trailingSlashRegex, "");
  const normalizedFileName = options.fileName
    .replace(leadingSlashRegex, "")
    .replace(trailingSlashRegex, "");

  return normalizedFolder
    ? `${normalizedFolder}/${normalizedFileName}`
    : normalizedFileName;
}

export function getPublicObjectUrl(
  key: string,
  config: R2Config = getR2Config()
): string | null {
  if (!config.publicBaseUrl) {
    return null;
  }

  return `${config.publicBaseUrl.replace(trailingSlashRegex, "")}/${key.replace(leadingSlashRegex, "")}`;
}

export function createUploadUrl(
  options: CreateUploadUrlOptions,
  serviceOptions: R2ServiceOptions = {}
): Promise<string> {
  const config = serviceOptions.config ?? getR2Config();
  const client = serviceOptions.client ?? createR2Client(config);
  const input: PutObjectCommandInput = {
    Bucket: options.bucket ?? config.bucket,
    Key: options.key,
    ContentType: options.contentType,
  };

  return getSignedUrl(client, new PutObjectCommand(input), {
    expiresIn: options.expiresIn ?? 900,
  });
}

export function createDownloadUrl(
  options: CreateDownloadUrlOptions,
  serviceOptions: R2ServiceOptions = {}
): Promise<string> {
  const config = serviceOptions.config ?? getR2Config();
  const client = serviceOptions.client ?? createR2Client(config);

  return getSignedUrl(
    client,
    new GetObjectCommand({
      Bucket: options.bucket ?? config.bucket,
      Key: options.key,
    }),
    { expiresIn: options.expiresIn ?? 900 }
  );
}

export async function deleteObject(
  key: string,
  serviceOptions: R2ServiceOptions = {}
): Promise<void> {
  const config = serviceOptions.config ?? getR2Config();
  const client = serviceOptions.client ?? createR2Client(config);

  await client.send(
    new DeleteObjectCommand({
      Bucket: config.bucket,
      Key: key,
    })
  );
}

export async function objectExists(
  key: string,
  serviceOptions: R2ServiceOptions = {}
): Promise<boolean> {
  const config = serviceOptions.config ?? getR2Config();
  const client = serviceOptions.client ?? createR2Client(config);

  try {
    await client.send(
      new HeadObjectCommand({
        Bucket: config.bucket,
        Key: key,
      })
    );
    return true;
  } catch {
    return false;
  }
}
