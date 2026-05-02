import express, { type Request, type Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoute from "./modules/user/user.route"
import authRouter from "./modules/auth/auth.route"
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/v1/users', userRoute)
app.use('/api/v1/auth' , authRouter)

const port = process.env.PORT || 5000

app.get('/' , (req :  Request , res : Response) => {
  res.send(`Skill Bridge running on Port ${port}`)
})
app.listen(port , () =>{
  console.log(`Server running on port on ${port}`)
})

