import express from 'express';
import bodyParser from 'body-parser';
import restRouter from "./routes/restaurant.route.js";
import CustomerRouter from "./routes/customer.route.js"
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/restaurant",restRouter);
app.use("/customer",CustomerRouter);

app.listen(8080,()=>{
    console.log("8080 ............Mezbaan Server Started . . .");
});