import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service";
import { connectDB } from "../config/database";

dotenv.config();

const seedServices = [
  {
    name: "Basic Wash",
    price: 29.99,
    features: ["Exterior Wash", "Hand Dry", "Wheel Cleaning"],
    popular: false,
  },
  {
    name: "Premium Wash",
    price: 49.99,
    features: [
      "Exterior Wash",
      "Hand Dry",
      "Wheel Cleaning",
      "Interior Vacuum",
      "Dashboard Cleaning",
    ],
    popular: true,
  },
  {
    name: "Deluxe Detail",
    price: 89.99,
    features: [
      "Full Service Wash",
      "Interior Detail",
      "Wax Protection",
      "Tire Shine",
      "Air Freshener",
    ],
    popular: false,
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await Service.deleteMany({}); // Clear existing services
    await Service.insertMany(seedServices);
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
