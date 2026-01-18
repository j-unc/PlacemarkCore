import { ServerRoute } from "@hapi/hapi";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { adminController } from "./controllers/admin-controller.js";
import { poiController } from "./controllers/poi-controller.js";

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
  },
  {
    method: "GET",
    path: "/logout",
    options: accountsController.logout
  },
  {
    method: "GET",
    path: "/dashboard",
    options: dashboardController.index
  },
  {
    method: "GET",
    path: "/admin-overview",
    options: adminController.index
  },
  {
    method: "GET",
    path: "/admin-overview/deleteUser/{id}",
    options: adminController.deleteUser
  },
  {
    method: "GET",
    path: "/poi",
    options: poiController.index
  },
  {
    method: "GET",
    path: "/poi/add",
    options: poiController.addForm
  },
  {
    method: "POST",
    path: "/poi/add",
    options: poiController.addPlacemark
  },
  {
    method: "GET",
    path: "/poi/edit/{id}",
    options: poiController.updateForm
  },
  {
    method: "POST",
    path: "/poi/edit/{id}",
    options: poiController.updatePlacemark
  },
  {
    method: "GET",
    path: "/poi/delete/{id}",
    options: poiController.deletePlacemark
  }
];
