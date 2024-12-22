import { PrismaClient } from "../prisma/generated/client2"

const prismaClientSingleton = () => {
  return new PrismaClient()
}


const db2 = prismaClientSingleton()

export default db2

