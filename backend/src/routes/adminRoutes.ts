import { Router, RequestHandler } from "express";
import { isAdmin } from "../middleware/auth";
import {
  getAllBookings,
  updateBookingStatus,
  getAllCompanies,
  createCompany,
  toggleCompanyVerification,
  getAllServices,
  createService,
  toggleServicePopular,
} from "../controllers/adminController";

const router = Router();

router.get(
  "/bookings",
  isAdmin as RequestHandler,
  getAllBookings as RequestHandler
);
router.patch(
  "/bookings/:id/status",
  isAdmin as RequestHandler,
  updateBookingStatus as RequestHandler
);

router.get(
  "/companies",
  isAdmin as RequestHandler,
  getAllCompanies as RequestHandler
);
router.post(
  "/companies",
  isAdmin as RequestHandler,
  createCompany as RequestHandler
);
router.patch(
  "/companies/:id/verify",
  isAdmin as RequestHandler,
  toggleCompanyVerification as RequestHandler
);

router.get(
  "/services",
  isAdmin as RequestHandler,
  getAllServices as RequestHandler
);
router.post(
  "/services",
  isAdmin as RequestHandler,
  createService as RequestHandler
);
router.patch(
  "/services/:id/popular",
  isAdmin as RequestHandler,
  toggleServicePopular as RequestHandler
);

export default router;
