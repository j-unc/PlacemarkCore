import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { UserStore } from "../store.js"; 
import { User } from "../user.js";

export const userStoreJson: UserStore = {

  async getAll(): Promise<User[]> {
    await db.read();
    return db.data.users;
  },

  async getById(id: string): Promise<User | undefined> {
    await db.read();
    return db.data.users.find(u => u._id === id);
  },

  async getByEmail(email: string): Promise<User | undefined> {
    await db.read();
    return db.data.users.find(u => u.email === email);
  },

  async add(user: Omit<User, "_id">): Promise<User> {
    await db.read();
    const newUser: User = {
      _id: v4(),
      email: user.email,
      password: user.password,
      role: user.role
    };
    db.data.users.push(newUser);
    await db.write();
    return newUser;
  },

  async deleteById(id: string): Promise<void> {
    await db.read();
    db.data.users = db.data.users.filter(u => u._id !== id);
    await db.write();
  },

  async deleteAll(): Promise<void> {
    db.data.users = [];
    await db.write();
  }

  // TODO: add Update user method, expand User
};
