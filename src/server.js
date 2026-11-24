import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import appRouter from "./routers/index.js";

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 }, abortOnLimit: true }));
app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use(appRouter);
app.use((_req, res) => res.status(404).json({ status: 404, message: "Route not found" }));
app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const code = Number(error.status || error.statusCode);
    const status = Number.isInteger(code) && code >= 400 && code <= 599 ? code : 500;
    if (status >= 500) console.error(req.method, req.path, error);
    res.status(status).json({ status, message: status >= 500 ? "Internal server error" : String(error.message || "Request failed") });
});
const port = Number(process.env.PORT || 3000);
app.listen(port, () => console.log(`Server listening on port ${port}`));
