/*
  Warnings:

  - You are about to drop the column `userId` on the `m_user_details` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "m_user_details_userId_key";

-- AlterTable
ALTER TABLE "m_user_details" DROP COLUMN "userId";
