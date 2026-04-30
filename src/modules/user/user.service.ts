import { prisma } from "../../../lib/prisma";


const createUserInDb = async (payload : {
  name : string, 
  email: string,
  password : string,
  phone: string
}) => {
const result = await prisma.user.create({
  data : payload
})
 return result
}

export const UserService = {
  createUserInDb
}