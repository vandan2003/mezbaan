import Plan from "../model/plan.model.js";
import Admin from "../model/admin.model.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { request, response } from "express";

export const addPlan = async (request, response,next) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ error: 'Bad request', messages: errors.array() });
        }

        const { planName, duration, price } = request.body; 
        const newPlan = await Plan.create( { planName, duration, price } );

        return response.status(200).json({ plan: newPlan, status: true });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "plan Added Successfully...", error: 'Internal Server Error', status: false });
    }
}
 
export const updatePlan = async (request, response, next) => {
    try {
      const planid = request.params.id;
      const plan = await Plan.findByPk(planid);
      if (!plan) {
        return response.status(404).json({ error: "plan not found", status: false });
      }
       // admin.email = request.body.email;
    plan.planName = request.body.planName;
    plan.duration = request.body.duration;
    plan.price = request.body.price;
      await plan.save();
      console.log(plan);
      return response.status(200).json({ plan:plan, message: "plan updated successfully......", status: true });
    } catch (err){
       console.log(err);
      return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const removePlan = async (request, response, next) => {
  try {
    const planid = request.params.id;
    const plan = await Plan.findByIdAndRemove(planid);
    if (!plan) {
      return response.status(404).json({ error: "plan not found", status: false });
    }
    
    return response.status(200).json({ plan:plan, message: "plan remove successfully......", status: true });
  } 
  catch (err){
     console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}