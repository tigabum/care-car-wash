import { Request, Response } from "express";
import Booking from "../models/Booking";
import Service from "../models/Service";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate("packageId")
      .sort({ appointmentDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

export const getBookingStats = async (req: Request, res: Response) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          revenue: {
            $sum: {
              $cond: [
                { $eq: ["$status", "completed"] },
                { $toDouble: "$packageId.price" },
                0,
              ],
            },
          },
        },
      },
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayBookings = await Booking.countDocuments({
      createdAt: { $gte: today },
    });

    res.json({
      statusBreakdown: stats,
      todayBookings,
      totalBookings: await Booking.countDocuments(),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching booking stats", error });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate("packageId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: "Error updating booking status", error });
  }
};

export const getServiceStats = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    const stats = await Promise.all(
      services.map(async (service) => {
        const bookings = await Booking.countDocuments({
          packageId: service._id,
        });
        const revenue = await Booking.aggregate([
          {
            $match: {
              packageId: service._id,
              status: "completed",
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: { $toDouble: "$packageId.price" } },
            },
          },
        ]);

        return {
          service: service.name,
          bookings,
          revenue: revenue[0]?.total || 0,
        };
      })
    );

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service stats", error });
  }
};
