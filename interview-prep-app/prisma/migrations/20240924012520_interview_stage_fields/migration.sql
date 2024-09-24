/*
  Warnings:

  - You are about to drop the column `stageName` on the `InterviewStage` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InterviewStage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stageDate" DATETIME,
    "format" TEXT,
    "type" TEXT,
    "interviewId" TEXT NOT NULL,
    "mockTemplateId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InterviewStage_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InterviewStage_mockTemplateId_fkey" FOREIGN KEY ("mockTemplateId") REFERENCES "MockTemplate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_InterviewStage" ("createdAt", "format", "id", "interviewId", "mockTemplateId", "stageDate", "updatedAt") SELECT "createdAt", "format", "id", "interviewId", "mockTemplateId", "stageDate", "updatedAt" FROM "InterviewStage";
DROP TABLE "InterviewStage";
ALTER TABLE "new_InterviewStage" RENAME TO "InterviewStage";
CREATE UNIQUE INDEX "InterviewStage_mockTemplateId_key" ON "InterviewStage"("mockTemplateId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
