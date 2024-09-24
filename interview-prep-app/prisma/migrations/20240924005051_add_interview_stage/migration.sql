-- CreateTable
CREATE TABLE "InterviewStage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "stageName" TEXT NOT NULL,
    "stageDate" DATETIME,
    "format" TEXT,
    "interviewId" TEXT NOT NULL,
    "mockTemplateId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InterviewStage_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "InterviewStage_mockTemplateId_fkey" FOREIGN KEY ("mockTemplateId") REFERENCES "MockTemplate" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "InterviewStage_mockTemplateId_key" ON "InterviewStage"("mockTemplateId");
