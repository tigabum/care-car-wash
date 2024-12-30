import { Router, RequestHandler } from "express";
import {
  getServices,
  createService,
  getServiceById,
} from "../controllers/serviceController";

const router = Router();

router.get("/", getServices as RequestHandler);
router.post("/", createService as RequestHandler);
router.get("/:id", getServiceById as RequestHandler);

export default router;
