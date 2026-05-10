import { Router } from "express";
import { bookingController } from "./booking.controller";

const bookingRoute = Router()
bookingRoute.post('/' , bookingController.createBooking)
bookingRoute.get('/student/:id' , bookingController.getStudentBooking)
bookingRoute.get('/tutor/:id' , bookingController.getTutorBooking)


export default  bookingRoute