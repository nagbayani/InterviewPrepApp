-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserResume" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "skills" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "projects" TEXT NOT NULL,
    CONSTRAINT "UserResume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserResume" ("createdAt", "experience", "id", "pdfUrl", "projects", "skills", "updatedAt", "userId") SELECT "createdAt", "experience", "id", "pdfUrl", "projects", "skills", "updatedAt", "userId" FROM "UserResume";
DROP TABLE "UserResume";
ALTER TABLE "new_UserResume" RENAME TO "UserResume";
CREATE UNIQUE INDEX "UserResume_userId_key" ON "UserResume"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
