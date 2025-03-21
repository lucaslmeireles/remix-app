-- CreateEnum
CREATE TYPE "SupplierType" AS ENUM ('ckd', 'local');

-- CreateEnum
CREATE TYPE "StockType" AS ENUM ('SENS', 'HERMES');

-- CreateTable
CREATE TABLE "Sets" (
    "id" SERIAL NOT NULL,
    "ref1" TEXT NOT NULL,
    "ref2" TEXT NOT NULL,
    "ref3" TEXT NOT NULL,
    "avg_montlhy_consume" DOUBLE PRECISION,
    "model" TEXT NOT NULL,
    "description" TEXT,
    "uc" TEXT,
    "rack" TEXT,
    "components" INTEGER NOT NULL,

    CONSTRAINT "Sets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComponentsToSets" (
    "set" INTEGER NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "ComponentsToSets_pkey" PRIMARY KEY ("set")
);

-- CreateTable
CREATE TABLE "Components" (
    "id" SERIAL NOT NULL,
    "reference" TEXT NOT NULL,
    "cofor" TEXT NOT NULL,
    "supplier" INTEGER NOT NULL,
    "description" TEXT,
    "UA" TEXT,
    "local" TEXT,

    CONSTRAINT "Components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "type" "SupplierType" NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SetsToOrders" (
    "set" INTEGER NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "SetsToOrders_pkey" PRIMARY KEY ("set")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dtDelivered" TIMESTAMP(3),
    "dtDeliver" TIMESTAMP(3) NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "qtd" INTEGER NOT NULL,
    "nf_3" TEXT,
    "nf_13" TEXT,
    "orderedBy" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "company" INTEGER NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companies" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "address" TEXT,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "component" INTEGER NOT NULL,
    "type" "StockType" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ComponentsToComponentsToSets" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ComponentsToComponentsToSets_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ComponentsToComponentsToSets_B_index" ON "_ComponentsToComponentsToSets"("B");

-- AddForeignKey
ALTER TABLE "ComponentsToSets" ADD CONSTRAINT "ComponentsToSets_set_fkey" FOREIGN KEY ("set") REFERENCES "Sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Components" ADD CONSTRAINT "Components_supplier_fkey" FOREIGN KEY ("supplier") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SetsToOrders" ADD CONSTRAINT "SetsToOrders_set_fkey" FOREIGN KEY ("set") REFERENCES "Sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_sets_fkey" FOREIGN KEY ("sets") REFERENCES "Sets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_orderedBy_fkey" FOREIGN KEY ("orderedBy") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_company_fkey" FOREIGN KEY ("company") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_component_fkey" FOREIGN KEY ("component") REFERENCES "Components"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComponentsToComponentsToSets" ADD CONSTRAINT "_ComponentsToComponentsToSets_A_fkey" FOREIGN KEY ("A") REFERENCES "Components"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComponentsToComponentsToSets" ADD CONSTRAINT "_ComponentsToComponentsToSets_B_fkey" FOREIGN KEY ("B") REFERENCES "ComponentsToSets"("set") ON DELETE CASCADE ON UPDATE CASCADE;
