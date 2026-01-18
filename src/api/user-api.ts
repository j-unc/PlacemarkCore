import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";
import { create } from "node:domain";

export const userApi = {
  findAll: {
    auth: false,

    handler: async () => {
        try {
            return await db.userStore!.getAll();
        } catch (err) {
            return Boom.serverUnavailable("Database Error");
        }
    },

    tags: ["api"],
    description: "Get all users",
    notes: "Returns all users",
    response: { schema: UserSpec }
  },
   
  findOne: {
    auth: false,
    handler: async (request: Request) => {
        try {
            const user = await db.userStore!.getById(request.params.id);
            if (!user) {
                return Boom.notFound("No user with this id");
            }
            return user;
        } catch (err) {
            return Boom.serverUnavailable("Database Error");
        }
    },

    tags: ["api"],
    description: "Find a user",
    notes: "Returns a user",
    response: { schema: UserSpec }
  },

  create: {
    auth: false,

    handler: async (request: Request, h: ResponseToolkit) => {
        try {
            const user = await db.userStore!.add(request.payload as any);
            return h.response(user).code(201);
        } catch (err) {
            return Boom.serverUnavailable("Database Error");
        }
    },

    tags: ["api"],
    description: "Create a user",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec },
    response: { schema: UserSpec }
    },

    deleteOne: {
        auth: false,
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const user = await db.userStore!.getById(request.params.id);
                if (!user) {
                    return Boom.notFound("No user with this id");
                }
                await db.userStore!.deleteById(user._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },

        tags: ["api"],
        description: "Delete a user"
    }
};

