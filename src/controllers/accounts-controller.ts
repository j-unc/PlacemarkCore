import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { UserSpec } from "../models/joi-schemas.js";         

export const accountsController = {
  loginForm: {
    auth: false as false,

    handler: (request: Request, h: ResponseToolkit) => {
      return h.view("auth/login", { title: "Login" });
    }
  },

  signupForm: {
    auth: false as false,

    handler: (request: Request, h: ResponseToolkit) => {
      return h.view("auth/signup", { title: "Sign Up" });
    }
  },

  signup: {
    auth: false as false,

    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: (request: Request, h: ResponseToolkit, error: any) => {
        return h
          .view("auth/signup", {
            title: "Sign up error",
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },

    handler: async (request: Request, h: ResponseToolkit) => {
      const { email, password } = request.payload as any;

      const existingUser = await db.userStore!.getByEmail(email);
      if (existingUser) {
        return h
          .view("auth/signup", {
            title: "Sign up error",
            error: "Email already registered"
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
  },

  login: {
    auth: false as false,

    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      failAction: (request: Request, h: ResponseToolkit, error: any) => {
        return h
          .view("auth/login", {
            title: "Login error",
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },

    handler: async (request: Request, h: ResponseToolkit) => {
      const { email, password } = request.payload as any;

      const user = await db.userStore!.getByEmail(email);
      if (!user || user.password !== password) {
        return h
          .view("auth/login", {
            title: "Login error",
            error: "Invalid email or password"
          })
          .code(401);
      }

      return h.redirect("/");
    }
  }

};
