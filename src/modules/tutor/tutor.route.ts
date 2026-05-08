import { Router } from "express";
import { tutorController } from "./tutor.controller";

const   tutorRoute = Router();

tutorRoute.post("/profile", tutorController.createTutor);
export default tutorRoute;
