import jwt from "jsonwebtoken";
import { env } from "../config/env";

export function signJwtToken(payload: any) {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "1d",
    algorithm: "HS256",
  });

  console.log(token);
  return token;
}
