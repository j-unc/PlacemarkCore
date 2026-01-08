import { ServerRoute } from "@hapi/hapi";

export const routes: ServerRoute[] = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.view("home", { title: "Home Page" });
    }
  }
];
