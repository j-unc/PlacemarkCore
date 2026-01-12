import { ServerRoute } from "@hapi/hapi";

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
    handler: (request, h) => {
      return h.view("auth/login", { title: "Login" });
    }
  },
  {
    method: "GET",
    path: "/signup",
    handler: (request, h) => {
      return h.view("auth/signup", { title: "Sign Up" });
    }
  }
];
