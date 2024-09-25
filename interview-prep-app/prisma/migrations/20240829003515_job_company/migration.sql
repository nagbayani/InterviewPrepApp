/*
  Warnings:

  - You are about to drop the column `jobTitle` on the `Interview` table. All the data in the column will be lost.
  - Added the required column `company` to the `Interview` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Interview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "company" TEXT NOT NULL,
    "jobPosition" TEXT NOT NULL,
    "expectedSalary" TEXT,
    "jobDescription" TEXT,
    "userId" TEXT NOT NULL,
    "mockTemplateId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Interview" ("createdAt", "expectedSalary", "id", "jobDescription", "jobPosition", "mockTemplateId", "updatedAt", "userId") SELECT "createdAt", "expectedSalary", "id", "jobDescription", "jobPosition", "mockTemplateId", "updatedAt", "userId" FROM "Interview";
DROP TABLE "Interview";
ALTER TABLE "new_Interview" RENAME TO "Interview";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
