import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";

export const accountsController = {
  loginForm: (request: Request, h: ResponseToolkit) => {
    return h.view("auth/login", { title: "Login" });
  },

  signupForm: (request: Request, h: ResponseToolkit) => {
    return h.view("auth/signup", { title: "Sign Up" });
  },

  signup: async (request: Request, h: ResponseToolkit) => {
    const { email, password } = request.payload as {
      email: string;
      password: string;
    };

    const existingUser = await db.userStore!.getByEmail(email);
    if (existingUser) {
      return h
        .view("auth/signup", {
          title: "Sign Up",
          error: "Email already registered",
          email
        })
        .code(400);
    }

    await db.userStore!.add({
      email,
      password,
      role: "user"
    });

    return h.redirect("/login");
  }

};
