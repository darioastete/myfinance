import { v4 as uuid } from "uuid";

export const generateId = () => {
  // return createHash("sha256").update(str).digest("hex");
  return uuid();
};
