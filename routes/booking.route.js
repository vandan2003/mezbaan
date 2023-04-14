import express from 'express';
import { cancel, confirm, history, historyRest } from '../contollers/booking.controller.js';

const bookingRouter  = express.Router();

bookingRouter.post("/confirm",confirm);

bookingRouter.get("/cancel",cancel);

bookingRouter.post("/history",history);

bookingRouter.get("/history/:id",historyRest);

export default bookingRouter;