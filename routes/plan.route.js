import express from "express";
import { addPlan, removePlan, updatePlan } from "../contollers/plan.controller.js";

const router = express.Router();

router.post("/add",addPlan);
router.post("/update/:id",updatePlan);
router.post("/remove/:id",removePlan);

export default router;