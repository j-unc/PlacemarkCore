import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { PlacemarkSpec } from "../models/joi-schemas.js";

export const poiController = {
    index: {
        handler: async (request: Request, h: ResponseToolkit) => {
            const placemarks = await db.placemarkStore!.getAll();
            return h.view("poi/index", { 
                title: "Points of Interest", 
                placemarks: placemarks 
            });
        }
    },

    addForm: {
        handler: (request: Request, h: ResponseToolkit) => {
            return h.view("poi/add", { 
                title: "Add Placemark" });
        }
    },

    addPlacemark: {
        validate: {
            payload: PlacemarkSpec,
            options: { abortEarly: false },
            failAction: (request: Request, h: ResponseToolkit, error: any) => {
                console.log(error);
                return h
                    .view("poi/add", {  
                        title: "Error Adding Placemark",
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },

        handler: async (request: Request, h: ResponseToolkit) => {
            const poi = request.payload as any;

            await db.placemarkStore!.add({
                userId: request.auth.credentials._id as string,
                name: poi.name,
                description: poi.description,
                latitude: poi.latitude,
                longitude: poi.longitude
            });
            return h.redirect("/poi");
        }
    },

    updateForm: {
        handler: async (request: Request, h: ResponseToolkit) => {
            const placemarkId = request.params.id;
            
            const placemark = await db.placemarkStore!.getById(placemarkId);
            if (!placemark) {
                return h.response().code(404);
            }
            return h.view("poi/edit", { 
                title: "Edit Placemark", 
                placemark: placemark 
            });
        }
    },

    updatePlacemark: {
        validate: {
            payload: PlacemarkSpec,
            options: { abortEarly: false },
            failAction: (request: Request, h: ResponseToolkit, error: any) => {
                return h
                    .view("poi/edit", {  
                        title: "Error Updating Placemark",
                        errors: error.details
                    })
                    .takeover()
                    .code(400);
            }
        },

        handler: async (request: Request, h: ResponseToolkit) => {
            const oldPoi = await db.placemarkStore!.getById(request.params.id);
            const user = request.auth.credentials;
            const poi = request.payload as any;

            if (oldPoi!.userId !== user._id && user.role !== "admin") {
                return h.response().code(403);
            }

            const updatedPlacemark = await db.placemarkStore!.update({
                _id: oldPoi!._id,
                userId: request.auth.credentials._id as string,
                name: poi.name,
                description: poi.description,
                latitude: poi.latitude,
                longitude: poi.longitude
            });

            if (!updatedPlacemark) {
                return h.response().code(404);
            }

            return h.redirect("/poi");
        }
    },

    deletePlacemark: {
        handler: async (request: Request, h: ResponseToolkit) => {
            const poi = await db.placemarkStore!.getById(request.params.id);
            const user = request.auth.credentials;

            if (poi!.userId !== user._id && user.role !== "admin") {
                return h.response().code(403);
            }
            
            await db.placemarkStore!.deleteById(poi!._id);
            return h.redirect("/poi");
        }
    }
};



    
