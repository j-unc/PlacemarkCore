import { ServerRoute } from "@hapi/hapi";
import { placemarkApi } from "./api/poi-api";

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
    }
];