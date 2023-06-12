/*
  Warnings:

  - You are about to drop the `BoyNames` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GirlNames` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "BoyNames";

-- DropTable
DROP TABLE "GirlNames";

-- CreateTable
CREATE TABLE "BabyNames" (
    "id" SERIAL NOT NULL,
    "link" TEXT,
    "english" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "otherLanguage" JSONB,
    "isTop100" BOOLEAN NOT NULL DEFAULT false,
    "easyToPronounce" BOOLEAN NOT NULL DEFAULT false,
    "modernName" BOOLEAN NOT NULL DEFAULT false,
    "shortandSweet" BOOLEAN NOT NULL DEFAULT false,
    "religionid" INTEGER,
    "rashiid" INTEGER,
    "naksathraid" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "numerology" TEXT NOT NULL,

    CONSTRAINT "BabyNames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Naksathra" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "letters" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Naksathra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rashi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "letters" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rashi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Religion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Religion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BabyNames_english_idx" ON "BabyNames"("english");

-- CreateIndex
CREATE INDEX "BabyNames_gender_idx" ON "BabyNames"("gender");

-- CreateIndex
CREATE INDEX "BabyNames_meaning_idx" ON "BabyNames"("meaning");

-- CreateIndex
CREATE UNIQUE INDEX "Naksathra_name_key" ON "Naksathra"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rashi_name_key" ON "Rashi"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Religion_name_key" ON "Religion"("name");

-- AddForeignKey
ALTER TABLE "BabyNames" ADD CONSTRAINT "BabyNames_naksathraid_fkey" FOREIGN KEY ("naksathraid") REFERENCES "Naksathra"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BabyNames" ADD CONSTRAINT "BabyNames_rashiid_fkey" FOREIGN KEY ("rashiid") REFERENCES "Rashi"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BabyNames" ADD CONSTRAINT "BabyNames_religionid_fkey" FOREIGN KEY ("religionid") REFERENCES "Religion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
