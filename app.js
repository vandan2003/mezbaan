import express from 'express';
import bodyParser from 'body-parser';
import restRouter from "./routes/restaurant.route.js";
import path from "path";
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
const app = express();




app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set("view-engine","ejs");
app.use("/restaurant",restRouter);

const publicPath = path.join(path.dirname(fileURLToPath(import.meta.url)),"public");
app.use(express.static(publicPath));






app.listen(7080,()=>{
    console.log("Mezbaan Server Started . . .");
});