import { Request, Response } from "express";
import Booking from "../models/Booking";
import Company from "../models/Company";
import Service from "../models/Service";

// Booking Management
export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find()
      .populate("serviceId")
      .populate("companyId")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
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
    )
      .populate("serviceId")
      .populate("companyId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(400).json({ message: "Error updating booking status" });
  }
};

// Company Management
export const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: "Error creating company", error });
  }
};

export const toggleCompanyVerification = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    const company = await Company.findByIdAndUpdate(
      id,
      { isVerified },
      { new: true }
    );

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    res.status(400).json({ message: "Error updating company", error });
  }
};

// Service Management
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ message: "Error creating service", error });
  }
};

export const toggleServicePopular = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { popular } = req.body;

    const service = await Service.findByIdAndUpdate(
      id,
      { popular },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    res.status(400).json({ message: "Error updating service", error });
  }
};
