import express from 'express';
import bodyParser from 'body-parser';
import restRouter from "./routes/restaurant.route.js";
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/restaurant",restRouter);

app.listen(7080,()=>{
    console.log("Mezbaan Server Started . . .");
});