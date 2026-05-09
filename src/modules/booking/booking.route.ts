import { Router } from "express";
import { bookingController } from "./booking.controller";

const bookingRoute = Router()
bookingRoute.post('/' , bookingController.createBooking)
bookingRoute.get('/student/:id' , bookingController.getStudentBooking)


export default bookingRoute