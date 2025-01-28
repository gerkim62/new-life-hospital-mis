import express from "express";
import path from "path";
import "dotenv/config";
import indexRouter from "./routes";

const PORT = process.env["PORT"] || 3000;
const app = express();
app.use(express.json());

app.use("/api/v1", indexRouter);

const ___baseDir = path.resolve();
console.log(___baseDir);

console.log(___baseDir);

console.log(process.env["NODE_ENV"]);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
