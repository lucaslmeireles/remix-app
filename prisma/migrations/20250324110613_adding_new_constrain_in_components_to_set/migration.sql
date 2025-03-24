/*
  Warnings:

  - The primary key for the `ComponentsToSets` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_ComponentsToComponentsToSets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `component` to the `ComponentsToSets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ComponentsToComponentsToSets" DROP CONSTRAINT "_ComponentsToComponentsToSets_A_fkey";

-- DropForeignKey
ALTER TABLE "_ComponentsToComponentsToSets" DROP CONSTRAINT "_ComponentsToComponentsToSets_B_fkey";

-- AlterTable
ALTER TABLE "ComponentsToSets" DROP CONSTRAINT "ComponentsToSets_pkey",
ADD COLUMN     "component" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ComponentsToSets_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_ComponentsToComponentsToSets";

-- AddForeignKey
ALTER TABLE "ComponentsToSets" ADD CONSTRAINT "ComponentsToSets_component_fkey" FOREIGN KEY ("component") REFERENCES "Components"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
