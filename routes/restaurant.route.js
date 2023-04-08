import express from "express";
import { signUp  ,signUpPage ,signIn, list , block ,deny , verify ,addImage, addMenu, profile ,changePassword, changePasswordPage, rate, addFacilities, addCuisines, removeFacility, removeCuisine, removeImage, removeMenu} from "../contollers/restaurant.controller.js";
import { body } from "express-validator";
import multer from "multer";
import { verifyRestToken } from "../middlewares/restaurantToken.js";
const restRouter  = express.Router();
const upload = multer({dest:"public/restImage/"});

restRouter.get("/signUp",signUpPage);

restRouter.post("/signUp",upload.any('pictures'),
body("name","Not Aplhabet").isAlpha(),
body("name","Empty").notEmpty(),
body("contact").notEmpty(),
body("contact").isNumeric(),
body("contact").isLength({min:10,max:10}),
body("email").notEmpty(),
body("email").isEmail(),
body("password").notEmpty(),
// body("password","Not Strong").isStrongPassword(),
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
,signUp);

restRouter.post("/signIn",
body("email").isEmail(),
body("password").notEmpty(),
signIn)

restRouter.get("/list",list);

restRouter.get("/block/:id",block);

restRouter.get("/deny/:id",deny);

restRouter.get("/verify/:id",verify)

restRouter.post("/addImage",verifyRestToken,upload.any("pictures"),addImage);

restRouter.post("/addMenu",verifyRestToken,upload.any("pictures"),addMenu);

restRouter.get("/profile/:id",profile);

restRouter.get("/changePassword",verifyRestToken,changePasswordPage);

restRouter.post("/changePassword",verifyRestToken,changePassword);

restRouter.post("/rate",rate);

restRouter.post("/addfacility",verifyRestToken,addFacilities);

restRouter.post("/addcuisine",verifyRestToken,addCuisines);

restRouter.get("/remove-facilty/:id",verifyRestToken,removeFacility);

restRouter.get("/remove-cuisine/:id",verifyRestToken,removeCuisine);

restRouter.get("/remove-image/:id",verifyRestToken,removeImage);

restRouter.get("/remove-menu/:id",verifyRestToken,removeMenu);



export default restRouter;