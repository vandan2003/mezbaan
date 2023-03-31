import express from "express";
import { signUp } from "../contollers/restaurant.controller.js";
import { body } from "express-validator";

const restRouter  = express.Router();

restRouter.post("/signUp",
body("name").isAlpha(),
body("name").notEmpty(),
body("contact").notEmpty(),
body("contact").isNumeric(),
body("contact").isLength({min:10,max:10}),
body("email").notEmpty(),
body("email").isEmail(),
body("password").notEmpty(),
body("password").isStrongPassword(),
body("openingTime").notEmpty(),
body("closingTime").notEmpty(),
body("fssai").notEmpty(),
body("type").notEmpty(),
body("lattitude").notEmpty(),
body("lattitude").isDecimal(),
body("lattitude").isLength({min:9}),
body("longitude").notEmpty(),
body("longitude").isDecimal(),
body("longitude").isLength({min:9}),
body("totalTables").notEmpty(),
body("totalTables").isNumeric(),
body("type").notEmpty()
,signUp)

export default restRouter;