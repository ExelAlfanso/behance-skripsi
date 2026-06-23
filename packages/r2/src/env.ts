export interface R2Env {
  R2_ACCESS_KEY_ID?: string;
  R2_ACCOUNT_ID?: string;
  R2_BUCKET?: string;
  R2_PUBLIC_BASE_URL?: string;
  R2_SECRET_ACCESS_KEY?: string;
  [key: string]: string | undefined;
}

export interface R2Config {
  accessKeyId: string;
  accountId: string;
  bucket: string;
  publicBaseUrl?: string;
  secretAccessKey: string;
}

const requiredEnvKeys = [
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET",
] as const;

function requireEnvValue(
  env: R2Env,
  key: (typeof requiredEnvKeys)[number]
): string {
  const value = env[key];

  if (!value) {
    throw new Error(`Missing Cloudflare R2 env key: ${key}`);
  }

  return value;
}

export function getR2Config(env: R2Env = process.env): R2Config {
  return {
    accountId: requireEnvValue(env, "R2_ACCOUNT_ID"),
    accessKeyId: requireEnvValue(env, "R2_ACCESS_KEY_ID"),
    secretAccessKey: requireEnvValue(env, "R2_SECRET_ACCESS_KEY"),
    bucket: requireEnvValue(env, "R2_BUCKET"),
    publicBaseUrl: env.R2_PUBLIC_BASE_URL,
  };
}

export function getR2Endpoint(accountId: string): string {
  return `https://${accountId}.r2.cloudflarestorage.com`;
}
