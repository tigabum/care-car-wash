import { Request, Response } from "express";
import Company from "../models/Company";

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find({ isVerified: true })
      .select("name registrationNumber")
      .sort({ name: 1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching companies", error });
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: "Error creating company", error });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", error });
  }
};

export const searchCompanies = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const companies = await Company.find({
      isVerified: true,
      name: { $regex: query, $options: "i" },
    })
      .select("name registrationNumber")
      .limit(10)
      .sort({ name: 1 });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Error searching companies", error });
  }
};
