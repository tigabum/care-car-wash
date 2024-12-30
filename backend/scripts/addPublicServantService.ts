import { connect } from "mongoose";
import dotenv from "dotenv";
import Service from "../src/models/Service";

dotenv.config();

const addPublicServantService = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    console.log("Connecting to MongoDB...");
    await connect(uri);
    console.log("Connected successfully");

    const publicServantService = new Service({
      name: "Public Servant Special",
      price: 39.99,
      features: [
        "Exterior Wash",
        "Hand Dry",
        "Wheel Cleaning",
        "Interior Vacuum",
        "Dashboard Cleaning",
        "Special Discount for Public Servants",
      ],
      popular: false,
      isPublicServant: true,
      requiredCompanyVerification: true,
    });

    await publicServantService.save();
    console.log("Public Servant service added successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error adding public servant service:", error);
    process.exit(1);
  }
};

addPublicServantService();
