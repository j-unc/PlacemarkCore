import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: (request: Request, h: ResponseToolkit) => {
      const user = request.auth.credentials;
      return h.view("dashboard", {
        title: "Dashboard",
        user,
        isAdmin: user.role === "admin"
      });
    }
  }
};