import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async(request: Request, h: ResponseToolkit) => {
      const user = request.auth.credentials;
      const isAdmin = user.role === "admin";
      console.log("Dashboard accessed by user:", user.email, "Admin:", isAdmin);
      let placemarks; 

      if (isAdmin) {
        placemarks = await db.placemarkStore!.getAll();
      } else {
        placemarks = await db.placemarkStore!.getByUserId(user._id as string);
      }

      console.log("Retrieved placemarks for dashboard:", placemarks);

      // ToDo: show public placemarks on dashboard
      
      return h.view("dashboard", {
        title: "Dashboard",
        user,
        isAdmin,
        placemarks
      });
    }
  }
};