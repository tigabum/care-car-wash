import { connect } from "mongoose";
import dotenv from "dotenv";
import Company from "../src/models/Company";

dotenv.config();

const addSampleCompanies = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    console.log("Connecting to MongoDB...");
    await connect(uri);
    console.log("Connected successfully");

    const companies = [
      {
        name: "Las Vegas Police Department",
        registrationNumber: "LVPD001",
        contactNumber: "+1-702-555-0100",
        email: "contact@lvpd.gov",
        address: "400 S Martin L King Blvd, Las Vegas, NV 89106",
        isVerified: true,
      },
      {
        name: "Clark County Fire Department",
        registrationNumber: "CCFD001",
        contactNumber: "+1-702-555-0200",
        email: "contact@ccfd.gov",
        address: "500 S Grand Central Pkwy, Las Vegas, NV 89155",
        isVerified: true,
      },
      {
        name: "Nevada Highway Patrol",
        registrationNumber: "NHP001",
        contactNumber: "+1-702-555-0300",
        email: "contact@nhp.gov",
        address: "4615 W Sunset Rd, Las Vegas, NV 89118",
        isVerified: true,
      },
    ];

    // Use updateOne with upsert for each company
    for (const company of companies) {
      await Company.updateOne({ name: company.name }, company, {
        upsert: true,
      });
    }

    console.log("Sample companies updated/inserted successfully");

    // Verify the companies exist
    const count = await Company.countDocuments();
    console.log(`Total companies in database: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error("Error managing sample companies:", error);
    process.exit(1);
  }
};

addSampleCompanies();
