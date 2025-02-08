import express from "express";
import path from "path";
import "dotenv/config";
import indexRouter from "./routes";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import "express-async-errors";
import basicAuth from "express-basic-auth";
import { ApiResponse } from "./types/api/response";

const PORT = process.env["PORT"] || 3000;
const app = express();
app.use(express.json());

const adminPassword = process.env["ADMIN_PASSWORD"];

if (!adminPassword) {
  console.error("ADMIN_PASSWORD is not set.");
  process.exit(1);
}

app.use(
  basicAuth({
    users: { admin: adminPassword },
    challenge: true,
    realm: "Imb4T3st4pp",
    unauthorizedResponse: (): ApiResponse<unknown, unknown, "data"> => {
      return {
        success: false,
        message: "Unauthorized",
        errors: [],
      };
    },
  })
);
app.use("/api/v1", indexRouter);

const ___baseDir = path.resolve();

if (process.env["NODE_ENV"] === "production") {
  console.log("Server running in production mode");
  app.use(express.static(path.join(___baseDir, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(___baseDir, "../frontend/dist/index.html"));
  });
} else {
  console.warn(
    "Server running in dev mode. Make sure to run the frontend server as well."
  );
}

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
