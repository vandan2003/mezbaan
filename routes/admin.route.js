import express from "express";
import { changePassword, editProfile, signOut, signin, viewProfile } from "../contollers/admin.controller.js";

const router = express.Router();

router.post("/signin",signin);
router.get("/signout",signOut);
router.get("/profile/:id",viewProfile);
router.post("/editprofile/:id",editProfile);
router.post("/changepassword/:id",changePassword);


export default router;

