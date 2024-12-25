import { Router, Request, Response } from "express";
import { getServices, getServiceById } from "../controllers/serviceController";

const router = Router();

router.get("/", getServices as (req: Request, res: Response) => Promise<void>);
router.get(
  "/:id",
  getServiceById as (req: Request, res: Response) => Promise<void>
);

export default router;
