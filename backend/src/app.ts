import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import orderRoutes from "./routes/orderRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import { errorHandler } from "./middleware/errorHandler";
import companyRoutes from "./routes/companyRoutes";
import adminRoutes from "./routes/adminRoutes";

dotenv.config();

const app = express();

// CORS configuration - must be before routes
app.use(
  cors({
    origin: "http://localhost:3000", // Specific origin instead of wildcard
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Remove any other CORS configurations
// app.options('*', cors()); // Remove this if you have it

app.use(express.json());

// Debug middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Add this just before your routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/services", serviceRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/admin", adminRoutes);

// Basic route for testing
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start server after DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`CORS enabled for origin: http://localhost:3000`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  });

export default app;
