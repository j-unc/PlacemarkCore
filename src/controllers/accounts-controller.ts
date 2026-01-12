import { Request, ResponseToolkit } from "@hapi/hapi";

export const accountsController = {
  loginForm: (request: Request, h: ResponseToolkit) => {
    return h.view("auth/login", { title: "Login" });
  },

  signupForm: (request: Request, h: ResponseToolkit) => {
    return h.view("auth/signup", { title: "Sign Up" });
  }
};
