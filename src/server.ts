import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Joi from "joi";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { routes } from "./routes.js";
import { db } from "./models/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  });

  await db.init();

  server.validator(Joi);

  await server.register(Vision);

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./views",
    layout: "layouts/main",
    partialsPath: "./views/partials",
    isCached: false
  });

  server.route(routes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

init();
