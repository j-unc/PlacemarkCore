import { User } from "./user.js";

export interface UserStore {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
  add(user: Omit<User, "_id">): Promise<User>;
  deleteById(id: string): Promise<void>;
  deleteAll(): Promise<void>;
}
