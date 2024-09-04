import prisma from "@/lib/db";

// Get all interviews by user ID
export const getInterviewsByUserId = async (userId: string) => {
  const interviews = await prisma.interview.findMany({
    where: { userId },
    include: {
      mockTemplates: true, // Include related mock templates if needed
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

// Update an interview by interview ID
export const updateInterview = async (data: {
  interviewId: string;
  company: string;
  jobPosition: string;
  expectedSalary?: string | null;
  jobDescription?: string | null;
}) => {
  console.log("UPDATE INTERVIEW DATA", data);

  const interview = await prisma.interview.update({
    where: { id: data.interviewId },
    data: {
      company: data.company,
      jobPosition: data.jobPosition,
      expectedSalary: data.expectedSalary,
      jobDescription: data.jobDescription,
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
