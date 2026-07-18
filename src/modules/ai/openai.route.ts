import { Router } from "express";
import { chat } from "./openai.controller.js";

const route = Router()

route.post('/', chat)

export const Openai = route