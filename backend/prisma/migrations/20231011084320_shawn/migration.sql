/*
  Warnings:

  - You are about to drop the column `apptDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `feedback` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Instructor` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `ChatRoom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InstructorToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "ChatRoom" DROP CONSTRAINT "ChatRoom_studentId_fkey";

-- DropForeignKey
ALTER TABLE "InstructorToken" DROP CONSTRAINT "InstructorToken_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "StudentToken" DROP CONSTRAINT "StudentToken_studentId_fkey";

-- DropIndex
DROP INDEX "Student_username_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "apptDate",
DROP COLUMN "description",
DROP COLUMN "feedback",
ADD COLUMN     "lesson" JSONB[],
ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Instructor" DROP COLUMN "rating",
ADD COLUMN     "picture" TEXT[];

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "username",
ADD COLUMN     "instructorId" TEXT;

-- DropTable
DROP TABLE "ChatRoom";

-- DropTable
DROP TABLE "InstructorToken";

-- DropTable
DROP TABLE "StudentToken";

-- CreateTable
CREATE TABLE "ChatHistory" (
    "studentId" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "message" JSONB[],

    CONSTRAINT "ChatHistory_pkey" PRIMARY KEY ("studentId","instructorId")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatHistory" ADD CONSTRAINT "ChatHistory_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatHistory" ADD CONSTRAINT "ChatHistory_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "Instructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
