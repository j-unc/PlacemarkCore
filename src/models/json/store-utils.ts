import { JSONFilePreset } from "lowdb/node";
import { User } from "../user.js";

export const db = await JSONFilePreset("src/models/json/db.json", {
  users: [] as User[],
});