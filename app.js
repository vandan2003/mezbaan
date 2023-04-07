import express from 'express';
import bodyParser from 'body-parser';
import restRouter from "./routes/restaurant.route.js";
import adminRouter from './routes/admin.route.js';
import PlanRouter from './routes/plan.route.js';
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/restaurant",restRouter);
app.use("/admin",adminRouter);
app.use("/plan",PlanRouter);


app.listen(7080,()=>{
    console.log("Mezbaan Server Started . . .");
});
