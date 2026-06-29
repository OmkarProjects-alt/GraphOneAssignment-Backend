import dotenv from "dotenv"
dotenv.config();
import express  from "express";
import type { Request, Response } from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import { errorMiddleware } from "./middleware/error.middleware";
import companyRoutes from "./routes/company.routes";
import productRoutes from "./routes/product.routes";
import investorRoutes from "./routes/investor.routes";
import newsRoutes from "./routes/news.routes";
import founderRoutes from "./routes/founder.routes";
import statsRoutes from "./routes/stats.routes";
import searchRoutes from './routes/search.routes';

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

app.get("/", (req: Request, res: Response) => {
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

app.use((req: Request, res: Response) => {
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