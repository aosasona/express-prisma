import { default as jwt } from "jsonwebtoken";
import { promisify } from "util";
import config from "../configs/env.config";

// Promisified methods
export const methods = {
  sign: promisify(jwt.sign),
  verify: promisify(jwt.verify),
};

// Sign
export const sign = async (payload: any, options?: any) => {
  return await jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
    ...options,
  });
};

// Verify
export const verify = async (token: string) => {
  return await jwt.verify(token, config.jwt.secret);
};
