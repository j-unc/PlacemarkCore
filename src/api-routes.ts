import { ServerRoute } from "@hapi/hapi";
import { placemarkApi } from "./api/poi-api";
import { userApi } from "./api/user-api";

export const routes: ServerRoute[] = [
    {
        method: "GET",
        path: "/api/placemarks",
        handler: placemarkApi.findAll.handler
    },
    {
        method: "GET",
        path: "/api/placemarks/{id}",
        handler: placemarkApi.findOne.handler
    },
    {
        method: "POST",
        path: "/api/placemarks",
        handler: placemarkApi.create.handler
    },
    {
        method: "DELETE",
        path: "/api/placemarks/{id}",
        handler: placemarkApi.deleteOne.handler
    },
    {
        method: "GET",
        path: "/api/users",
        handler: userApi.findAll.handler
    },
    {
        method: "GET",
        path: "/api/users/{id}",
        handler: userApi.findOne.handler
    },
    {
        method: "POST",
        path: "/api/users",
        handler: userApi.create.handler
    },
    {
        method: "DELETE",
        path: "/api/users/{id}",
        handler: userApi.deleteOne.handler
    }
];