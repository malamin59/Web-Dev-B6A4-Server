import { Router } from "express";
import { bookingController } from "./booking.controller";

const bookingRoute = Router()
bookingRoute.post('/' , bookingController.createBooking)


export default bookingRoute