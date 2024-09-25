import prisma from "@/lib/db";

// Get all interviews by user ID
export const getInterviewsByUserId = async (userId: string) => {
  const interviews = await prisma.interview.findMany({
    where: { userId },
    include: {
      mockTemplates: true, // Include related mock templates if needed
      interviewStages: true, // Include interviewStages
    },
  });

  return interviews;
};

// Get a single interview by interview ID
export const getInterviewById = async (interviewId: string) => {
  const interview = await prisma.interview.findUnique({
    where: { id: interviewId },
    include: {
      mockTemplates: true, // Include related mock templates if needed
    },
  });
  return interview;
};

export const getInterviewStageById = async (interviewStageId: string) => {
  const interviewStage = await prisma.interviewStage.findUnique({
    where: { id: interviewStageId },
    include: {
      interview: true, // Include the related interview
    },
  });
  return interviewStage;
};

// Update an interview by interview ID
export const updateInterview = async (data: {
  interviewId: string;
  company: string;
  jobPosition: string;
  expectedSalary?: string | null;
  jobDescription?: string | null;
  skills?: string | null;
  qualifications?: string | null;
}) => {
  console.log("UPDATE INTERVIEW DATA", data);

  const interview = await prisma.interview.update({
    where: { id: data.interviewId },
    data: {
      company: data.company,
      jobPosition: data.jobPosition,
      expectedSalary: data.expectedSalary,
      jobDescription: data.jobDescription,
      skills: data.skills,
      qualifications: data.qualifications,
    },
  });

  if (interview) {
    console.log("Interview updated in database");
  }

  return interview;
};

// Delete an interview by interview ID
export const deleteInterviewById = async (interviewId: string) => {
  const deletedInterview = await prisma.interview.delete({
    where: { id: interviewId },
  });

  if (deletedInterview) {
    console.log("Interview deleted from database");
  }

  return deletedInterview;
};

// Create a new interview
export const createInterview = async (data: {
  company: string;
  jobPosition: string;
  expectedSalary?: string | null;
  jobDescription?: string | null;
  userId: string;
}) => {
  console.log("CREATE INTERVIEW DATA", data);
  const interview = await prisma.interview.create({
    data: {
      company: data.company,
      jobPosition: data.jobPosition,
      expectedSalary: data.expectedSalary,
      jobDescription: data.jobDescription,
      userId: data.userId,
    },
  });

  if (interview) {
    console.log("Interview created in database");
  }

  console.log("CREATE INTERVIEW DATA", interview);

  return interview;
};

// Update an interview by interview ID (PATCH - partial update)
export const patchUpdateInterview = async (data: {
  interviewId: string;
  company?: string;
  jobPosition?: string;
  expectedSalary?: string | null;
  jobDescription?: string | null;
  skills?: string | null;
  qualifications?: string | null;
  location?: string | null;
  dateApplied?: Date | null; // Date type for Prisma DateTime fields
  dateFollowUp?: Date | null; // Date type for Prisma DateTime fields
  status?: string | null;
}) => {
  console.log("PATCH UPDATE INTERVIEW DATA", data);

  // Construct the update data object dynamically
  const updateData: Record<string, any> = {};

  if (data.company !== undefined) {
    updateData.company = data.company;
  }
  if (data.jobPosition !== undefined) {
    updateData.jobPosition = data.jobPosition;
  }
  if (data.expectedSalary !== undefined) {
    updateData.expectedSalary = data.expectedSalary;
  }
  if (data.jobDescription !== undefined) {
    updateData.jobDescription = data.jobDescription;
  }
  if (data.skills !== undefined) {
    updateData.skills = data.skills;
  }
  if (data.qualifications !== undefined) {
    updateData.qualifications = data.qualifications;
  }
  if (data.location !== undefined) {
    updateData.location = data.location;
  }
  if (data.dateApplied !== undefined) {
    updateData.dateApplied = data.dateApplied;
  }
  if (data.dateFollowUp !== undefined) {
    updateData.dateFollowUp = data.dateFollowUp;
  }
  if (data.status !== undefined) {
    updateData.status = data.status;
  }

  // Ensure there's at least one field to update
  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields provided for update");
  }

  const interview = await prisma.interview.update({
    where: { id: data.interviewId },
    data: updateData,
  });

  if (interview) {
    console.log("Interview updated in database");
  }

  return interview;
};

// Update an interview stage by interviewStage ID (PATCH - partial update)
export const patchUpdateInterviewStage = async (data: {
  interviewStageId: string;
  stageDate?: Date | null; // Date type for Prisma DateTime fields
  format?: string | null;
  type?: string | null;
}) => {
  console.log("PATCH UPDATE INTERVIEW STAGE DATA", data);

  // Construct the update data object dynamically
  const updateData: Record<string, any> = {};

  if (data.stageDate !== undefined) {
    updateData.stageDate = data.stageDate;
  }
  if (data.format !== undefined) {
    updateData.format = data.format;
  }
  if (data.type !== undefined) {
    updateData.type = data.type;
  }

  // Ensure there's at least one field to update
  if (Object.keys(updateData).length === 0) {
    throw new Error("No fields provided for update");
  }

  // Perform the update using Prisma
  const interviewStage = await prisma.interviewStage.update({
    where: { id: data.interviewStageId },
    data: updateData,
  });

  if (interviewStage) {
    console.log("Interview stage updated in database");
  }

  return interviewStage;
};
