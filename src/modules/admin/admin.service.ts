import { prisma } from "../../../lib/prisma"

const getAllUserInDb = async ()=>{
    const result =  await prisma.user.findMany({
        include: {
            tutor : true
        }
    })
    return result
}

export const adminService = {
    getAllUserInDb
}