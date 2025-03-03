-- DropForeignKey
ALTER TABLE "m_users" DROP CONSTRAINT "m_users_detailId_fkey";

-- AlterTable
ALTER TABLE "m_users" ALTER COLUMN "detailId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "m_users" ADD CONSTRAINT "m_users_detailId_fkey" FOREIGN KEY ("detailId") REFERENCES "m_user_details"("id") ON DELETE SET NULL ON UPDATE CASCADE;
