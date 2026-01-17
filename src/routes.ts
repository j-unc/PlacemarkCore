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
    options: accountsController.loginForm
  },
  {
    method: "POST",
    path: "/login",
    options: accountsController.login
  },
  {
    method: "GET",
    path: "/signup",
    options: accountsController.signupForm
  },
  {
    method: "POST",
    path: "/signup",
    options: accountsController.signup
  }
];
