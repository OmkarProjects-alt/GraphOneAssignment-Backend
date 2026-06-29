import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "./middleware/error.middleware.js";
import companyRoutes from "./routes/company.routes.js";
import productRoutes from "./routes/product.routes.js";
import investorRoutes from "./routes/investor.routes.js";
import newsRoutes from "./routes/news.routes.js";
import founderRoutes from "./routes/founder.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import searchRoutes from './routes/search.routes.js';
const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(limiter);
app.get("/", (req, res) => {
    res.json({ message: "GraphOne Backend API Running 🚀" });
});
// routes
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/investors", investorRoutes);
app.use("/api/v1/news", newsRoutes);
app.use("/api/v1/founders", founderRoutes);
app.use("/api/v1/stats", statsRoutes);
app.use("/api/v1/search", searchRoutes);
app.use((req, res) => {
    res.status(404).json({
        data: null,
        meta: null,
        error: {
            code: "NOT_FOUND",
            message: "Route not found",
        },
    });
});
app.use(errorMiddleware);
export default app;
//# sourceMappingURL=app.js.map