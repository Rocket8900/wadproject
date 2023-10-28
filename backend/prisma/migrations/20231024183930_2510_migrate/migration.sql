/*
  Warnings:

  - A unique constraint covering the columns `[studentId,instructorId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Scene" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "options" JSONB[],
    "origin" BOOLEAN NOT NULL,

    CONSTRAINT "Scene_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_studentId_instructorId_key" ON "Review"("studentId", "instructorId");
