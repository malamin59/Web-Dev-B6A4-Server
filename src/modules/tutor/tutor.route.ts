import { Router } from "express";
import { tutorController } from "./tutor.controller";

const tutorRoute = Router();

tutorRoute.post("/profile", tutorController.createTutor);
tutorRoute.get("/", tutorController.getAllTutors);
tutorRoute.get("/:id", tutorController.getSingleTutors);
tutorRoute.post("/availability", tutorController.createAvailability);
tutorRoute.get("/my-profile/:userId", tutorController.getTutorByUserId);
export default tutorRoute;
