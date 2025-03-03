/*
  Warnings:

  - Added the required column `detailId` to the `m_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "m_users" ADD COLUMN     "detailId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "m_user_details" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "phone" TEXT,
    "address" TEXT,

    CONSTRAINT "m_user_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "m_user_details_userId_key" ON "m_user_details"("userId");

-- AddForeignKey
ALTER TABLE "m_users" ADD CONSTRAINT "m_users_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "m_user_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
