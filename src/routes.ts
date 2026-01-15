import { ServerRoute } from "@hapi/hapi";

import { accountsController } from "./controllers/accounts-controller.js";

export const routes: ServerRoute[] = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.view("home", { title: "Home Page" });
    }
  },
  {
    method: "GET",
    path: "/login",
    handler: accountsController.loginForm
  },
  {
    method: "GET",
    path: "/signup",
    handler: accountsController.signupForm
  },
  {
    method: "POST",
    path: "/signup",
    handler: accountsController.signup
  }
];
