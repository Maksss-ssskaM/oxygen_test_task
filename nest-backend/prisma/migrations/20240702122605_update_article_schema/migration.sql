/*
  Warnings:

  - Made the column `authorId` on table `ArticlePage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ArticlePage" DROP CONSTRAINT "Article_authorId_fkey";

-- AlterTable
ALTER TABLE "ArticlePage" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ArticlePage" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
