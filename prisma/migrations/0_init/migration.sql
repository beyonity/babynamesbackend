-- CreateTable
CREATE TABLE "BoyNames" (
    "id" SERIAL NOT NULL,
    "tamil" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BoyNames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GirlNames" (
    "id" SERIAL NOT NULL,
    "tamil" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GirlNames_pkey" PRIMARY KEY ("id")
);

