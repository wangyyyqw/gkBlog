import { createHash } from "crypto";

import type { NextApiRequest } from "next";

export const getSessionId = (req: NextApiRequest) => {
  const ipAddress = req.headers["x-forwarded-for"] || "localhost";

  // hashes the user's IP address and combines it with
  // a salt to create a unique session ID that preserves
  // the user's privacy by obscuring their IP address.
  const salt = process.env.SALT_IP_ADDRESS || "default-salt"; // 提供默认值以避免错误
  const currentSessionId = createHash("md5")
    .update(ipAddress + salt, "utf-8")
    .digest("hex");

  return currentSessionId;
};
