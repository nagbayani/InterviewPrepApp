/*
  Warnings:

  - Added the required column `interviewId` to the `MockTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Interview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobTitle" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL,
    "expectedSalary" TEXT,
    "jobDescription" TEXT,
    "userId" TEXT NOT NULL,
    "mockTemplateId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MockTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MockTemplate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MockTemplate_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MockTemplate" ("authorId", "createdAt", "description", "id", "title", "updatedAt") SELECT "authorId", "createdAt", "description", "id", "title", "updatedAt" FROM "MockTemplate";
DROP TABLE "MockTemplate";
ALTER TABLE "new_MockTemplate" RENAME TO "MockTemplate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
