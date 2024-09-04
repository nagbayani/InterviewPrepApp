/*
  Warnings:

  - Added the required column `type` to the `MockTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MockTemplate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MockTemplate_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MockTemplate_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MockTemplate" ("authorId", "createdAt", "description", "id", "interviewId", "title", "updatedAt") SELECT "authorId", "createdAt", "description", "id", "interviewId", "title", "updatedAt" FROM "MockTemplate";
DROP TABLE "MockTemplate";
ALTER TABLE "new_MockTemplate" RENAME TO "MockTemplate";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
