import { User } from "./user.js";
import { Placemark } from "./placemark.js";

export interface UserStore {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
  add(user: Omit<User, "_id">): Promise<User>;
  deleteById(id: string): Promise<void>;
}

export interface PlacemarkStore {
  getAll(): Promise<Placemark[]>;
  getById(id: string): Promise<Placemark | undefined>;
  add(placemark: Omit<Placemark, "_id">): Promise<Placemark>;
  update(placemark: Placemark): Promise<Placemark | undefined>;
  deleteById(id: string): Promise<void>;
}
