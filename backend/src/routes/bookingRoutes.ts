import { Router, Request, Response } from "express";
import {
  createBooking,
  getUserBookings,
  updateBookingStatus,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController";

const router = Router();

router.post(
  "/",
  createBooking as (req: Request, res: Response) => Promise<void>
);
router.get(
  "/user/:userId",
  getUserBookings as (req: Request, res: Response) => Promise<void>
);
router.get(
  "/:id",
  getBookingById as (req: Request, res: Response) => Promise<void>
);
router.patch(
  "/:id/status",
  updateBookingStatus as (req: Request, res: Response) => Promise<void>
);
router.delete(
  "/:id",
  cancelBooking as (req: Request, res: Response) => Promise<void>
);

export default router;
