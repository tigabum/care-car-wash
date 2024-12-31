import { Router, RequestHandler } from "express";
import serviceRoutes from "./serviceRoutes";
import bookingRoutes from "./bookingRoutes";
import companyRoutes from "./companyRoutes";
import adminRoutes from "./adminRoutes";
import { isAuth } from "../middleware/auth";

const router = Router();

// Public routes
router.use("/services", serviceRoutes);

// Protected routes
router.use("/bookings", isAuth as RequestHandler, bookingRoutes);
router.use("/companies", isAuth as RequestHandler, companyRoutes);

// Admin routes
router.use("/admin", adminRoutes);

export default router;
