import { Router } from "express";
import { tutorController } from "./tutor.controller";

const tutorRoute = Router();

tutorRoute.post("/profile", tutorController.createTutor);
tutorRoute.get("/", tutorController.getAllTutors);
tutorRoute.get("/:id", tutorController.getSingleTutors);
tutorRoute.get("/:userId", tutorController.getSingleTutors);
tutorRoute.post("/availability", tutorController.createAvailability);
tutorRoute.get("/my-profile/:userId", tutorController.getTutorByUserId);
tutorRoute.patch("/updateProfile/:id", tutorController.updateTutorProfile);

export default tutorRoute;
