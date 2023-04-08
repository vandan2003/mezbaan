import express from "express";
import { signup ,signin ,getCustomer, update , block, changePassword,addToFavourite,romoveFavourite} from "../contollers/customer.controller.js";
import { body } from "express-validator";
import { verifyToken } from "../middleware/tokenVerification.js";

const router = express.Router();

router.post("/signup",
body("name","Please Enter Name").notEmpty(),
body("email","Not valid email id").isEmail(),
body("contact","Only digit is allowed").isNumeric(),
body("password","Please enter password").notEmpty(),
body("password","Password must have 6 letter at least").isLength({min: 4}),
signup)
router.post("/signin",signin);
router.get("/profile/:id",verifyToken,getCustomer);
router.post("/edit",verifyToken,update);
router.get("/block/:id",verifyToken,block);
router.post("/changepassword",verifyToken,changePassword);
router.get("/add-to-favourite/:resId",addToFavourite);//crection
router.get("/remove-favourite/:resId",romoveFavourite);//crection


export default router;