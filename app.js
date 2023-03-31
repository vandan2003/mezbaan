import express from 'express';
import Restaurant from './model/restaurant.model.js';
import Customer from './model/Customer.model.js';
import Admin from './model/admin.model.js';
import {Review,Favourite,Booking} from './model/association.js';
const app = express();

app.listen(7080,()=>{
    console.log("Mezbaan Server Started . . .");
});