/*
  Warnings:

  - Made the column `description` on table `Components` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quantity` on table `ComponentsToSets` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ComponentsToSets" DROP CONSTRAINT "ComponentsToSets_component_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_orderedBy_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_sets_fkey";

-- DropForeignKey
ALTER TABLE "SetsToOrders" DROP CONSTRAINT "SetsToOrders_set_fkey";

-- DropForeignKey
ALTER TABLE "Stock" DROP CONSTRAINT "Stock_component_fkey";

-- AlterTable
ALTER TABLE "Components" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "ComponentsToSets" ALTER COLUMN "quantity" SET NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "ComponentsToSets" ADD CONSTRAINT "ComponentsToSets_component_fkey" FOREIGN KEY ("component") REFERENCES "Components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetsToOrders" ADD CONSTRAINT "SetsToOrders_set_fkey" FOREIGN KEY ("set") REFERENCES "Sets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_sets_fkey" FOREIGN KEY ("sets") REFERENCES "Sets"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_orderedBy_fkey" FOREIGN KEY ("orderedBy") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_component_fkey" FOREIGN KEY ("component") REFERENCES "Components"("id") ON DELETE CASCADE ON UPDATE CASCADE;
