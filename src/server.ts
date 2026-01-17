import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Joi from "joi";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { routes } from "./routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
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
      name: process.env.COOKIE_NAME,
      password: process.env.COOKIE_PASSWORD,
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
