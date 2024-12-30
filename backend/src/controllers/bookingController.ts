import { Request, Response } from "express";
import Booking from "../models/Booking";

export const createBooking = async (req: Request, res: Response) => {
  try {
    console.log("Received booking data:", req.body);

    const bookingData = {
      ...req.body,
      status: "pending",
    };

    console.log("Processed booking data:", bookingData);

    const booking = new Booking(bookingData);
    await booking.save();
    res.status(201).json(booking);
  } catch (error: any) {
    console.error("Booking creation error:", error);
    res.status(400).json({
      message: "Error creating booking",
      error: error.message,
      details: error.errors,
    });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log("Fetching bookings for userId:", userId); // Debug log

    const bookings = await Booking.find({ userId })
      .populate({
        path: "serviceId",
        select: "name price features", // Add any other fields you need
      })
      .populate("companyId")
      .sort({ createdAt: -1 });

    console.log("Found bookings:", bookings); // Debug log
    res.json(bookings);
  } catch (error) {
    console.error("Error in getUserBookings:", error); // Debug log
    res.status(500).json({
      message: "Error fetching bookings",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: "Error updating booking", error });
  }
};

export const getBookingById = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("packageId");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking", error });
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookingId = req.params.id;
    console.log("Attempting to cancel booking with ID:", bookingId);

    const booking = await Booking.findById(bookingId);
    console.log("Found booking:", booking);

    if (!booking) {
      console.log("Booking not found");
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    const result = await Booking.findByIdAndDelete(bookingId);
    console.log("Delete result:", result);

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Error cancelling booking" });
  }
};
