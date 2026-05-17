-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('google', 'github', 'credentials');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'credentials',
ALTER COLUMN "role" DROP DEFAULT;
