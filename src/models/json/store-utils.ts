import { JSONFilePreset } from "lowdb/node";
import { User } from "../user.js";
import { Placemark } from "../placemark.js";

export const db = await JSONFilePreset("src/models/json/db.json", {
  users: [] as User[],
  placemarks: [] as Placemark[],
});