-- CreateTable
CREATE TABLE "GeneratedLimits" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "generatedBundles" INTEGER NOT NULL DEFAULT 0,
    "generatedAnswers" INTEGER NOT NULL DEFAULT 0,
    "generatedFeedback" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GeneratedLimits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneratedLimits_userId_key" ON "GeneratedLimits"("userId");

-- AddForeignKey
ALTER TABLE "GeneratedLimits" ADD CONSTRAINT "GeneratedLimits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
