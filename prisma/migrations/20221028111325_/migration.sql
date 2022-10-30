/*
  Warnings:

  - The primary key for the `Technology` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Technology` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTechnology" DROP CONSTRAINT "_ProjectToTechnology_B_fkey";

-- AlterTable
ALTER TABLE "Technology" DROP CONSTRAINT "Technology_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "name" SET DEFAULT '',
ADD CONSTRAINT "Technology_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_ProjectToTechnology" ADD CONSTRAINT "_ProjectToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES "Technology"("id") ON DELETE CASCADE ON UPDATE CASCADE;
