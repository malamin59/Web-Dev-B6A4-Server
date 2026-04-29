import express, { type Request, type Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
const app = express()
app.use(cors())
dotenv.config()
app.use(express.json())

const port = process.env.PORT || 5000

app.get('/' , (req :  Request , res : Response) => {
  res.send(`Skill Bridge running on Port ${port}`)
})
app.listen(port , () =>{
  console.log(`Server running on port on ${port}`)
})

