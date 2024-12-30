import { Router, RequestHandler } from "express";
import {
  getCompanies,
  createCompany,
  getCompanyById,
  searchCompanies,
} from "../controllers/companyController";

const router = Router();

router.get("/", getCompanies as RequestHandler);
router.post("/", createCompany as RequestHandler);
router.get("/search", searchCompanies as RequestHandler);
router.get("/:id", getCompanyById as RequestHandler);

export default router;
