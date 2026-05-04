import { type Request, type Response } from "express";
import app from "./app";

const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send(`Skill Bridge running on Port ${port}`);
});
app.listen(port, () => {
  console.log(`Server running on port on ${port}`);
});
