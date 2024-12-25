import mongoose from "mongoose";
import Service from "../models/Service";
import dotenv from "dotenv";

dotenv.config();

const services = [
  {
    name: "Basic Wash",
    price: 15.99,
    features: [
      "Exterior Wash",
      "Spot-Free Rinse",
      "Power Dry",
      "Wheel Cleaning",
    ],
    popular: false,
  },
  {
    name: "Premium Wash",
    price: 24.99,
    features: [
      "Everything in Basic Wash",
      "Triple Foam Polish",
      "Underbody Wash",
      "Tire Shine",
      "Rain-X Protection",
    ],
    popular: true,
  },
  {
    name: "Ultimate Wash",
    price: 32.99,
    features: [
      "Everything in Premium Wash",
      "Ceramic Coating",
      "Interior Vacuum",
      "Dashboard Cleaning",
      "Window Cleaning",
      "Air Freshener",
    ],
    popular: false,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/carwash"
    );
    console.log("Connected to MongoDB");

    // Clear existing services
    await Service.deleteMany({});
    console.log("Cleared existing services");

    // Insert new services
    const createdServices = await Service.insertMany(services);
    console.log("Services seeded successfully:", createdServices);

    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
