import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { PlacemarkSpec} from "../models/joi-schemas.js";

export const placemarkApi = {
  findAll: {
    auth: false,

    handler: async () => {
      try {
        return await db.placemarkStore!.getAll();
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "Get all placemarks",
    notes: "Returns all placemarks",
    response: { schema: PlacemarkSpec}
  },

  findOne: {
    auth: false,

    handler: async (request: Request) => {
      try {
        const placemark = await db.placemarkStore!.getById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        return placemark;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "Find a placemark",
    notes: "Returns a placemark",
    response: { schema: PlacemarkSpec }
  },

  create: {
    auth: false,

    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const placemark = await db.placemarkStore!.add(request.payload as any);
        return h.response(placemark).code(201);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "Create a placemark",
    notes: "Returns the newly created placemark",
    validate: { payload: PlacemarkSpec },
    response: { schema: PlacemarkSpec }
  },

  deleteOne: {
    auth: false,

    handler: async (request: Request, h: ResponseToolkit) => {
      try {
        const placemark = await db.placemarkStore!.getById(request.params.id);
        if (!placemark) {
          return Boom.notFound("No placemark with this id");
        }
        await db.placemarkStore!.deleteById(placemark._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },

    tags: ["api"],
    description: "Delete a placemark"
  }
};

