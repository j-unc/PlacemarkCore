import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const adminController = {
    index: {
        handler: async (request: Request, h: ResponseToolkit) => {
            const user = request.auth.credentials;

            if (!user || user.role !== "admin") {
                return h.response().code(403);
            }

            const users = await db.userStore!.getAll();

            return h.view("admin-overview", {
                title: "User Administration",
                user,
                users,
            });
        }
    }
};

