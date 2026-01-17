import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Joi from "joi";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { routes } from "./routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";

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
  await server.register(Cookie);

  server.views({
    engines: { hbs: Handlebars },
    relativeTo: __dirname,
    path: "./views",
    layout: "layouts/main",
    partialsPath: "./views/partials",
    isCached: false
  });

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "playtime",
      password: "secretpasswordnotrevealedtoanyone",
      isSecure: false,
    },
    redirectTo: "/login",
    validate: accountsController.validate,
  });
  server.auth.default("session");

  server.route(routes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

init();
