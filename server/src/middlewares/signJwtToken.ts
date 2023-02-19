import jwt from "jsonwebtoken";
import { env } from "../config/env";

export async function signJwtToken(payload: string) {
  return jwt.sign(payload, Buffer.from(env.JWT_SECRET, "base64"), {
    expiresIn: "1d",
    algorithm: "HS256",
  });
}
