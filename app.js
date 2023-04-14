import express from 'express';
import bodyParser from 'body-parser';
import restRouter from "./routes/restaurant.route.js";
import adminRouter from './routes/admin.route.js';
import PlanRouter from './routes/plan.route.js';
import path from "path";
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import CustomerRouter from "./routes/customer.route.js"
import bookingRouter from './routes/booking.route.js';

const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view-engine","ejs");
app.use("/restaurant",restRouter);
app.use("/admin",adminRouter);
app.use("/plan",PlanRouter);
app.use("/customer",CustomerRouter);
app.use("/booking",bookingRouter);
const publicPath = path.join(path.dirname(fileURLToPath(import.meta.url)),"public");
app.use(express.static(publicPath));



app.listen(7080,()=>{
    console.log("Mezbaan Server Started . . .");
});
