export const mockInterviewStages = {
  screening: [
    {
      value: "introduction",
      label: "Introduction",
      description:
        "Basic introduction between the candidate and the interviewer.",
    },
    {
      value: "role-overview",
      label: "Role Overview",
      description: "The interviewer explains the job role and company.",
    },
    {
      value: "basic-qualifications",
      label: "Basic Qualifications",
      description: "Questions about the candidate's minimum qualifications.",
    },
    {
      value: "experience-overview",
      label: "Experience Overview",
      description: "High-level discussion of the candidate’s work experience.",
    },
    {
      value: "availability",
      label: "Next Steps",
      description: "Discussion of availability, salary, and next steps.",
    },
  ],
  individual: [
    {
      value: "introduction",
      label: "Introduction",
      description: "Rapport building and personal introduction.",
    },
    {
      value: "resume-discussion",
      label: "Resume Discussion",
      description: "In-depth questions about the candidate's past experiences.",
    },
    {
      value: "role-expectations",
      label: "Role Expectations",
      description: "The interviewer outlines the responsibilities of the role.",
    },
    {
      value: "skills-assessment",
      label: "Skills Assessment",
      description: "Technical or role-specific questions to assess fit.",
    },
    {
      value: "questions-for-interviewer",
      label: "Questions for the Interviewer",
      description: "Candidate asks questions to the interviewer.",
    },
    {
      value: "closing",
      label: "Closing",
      description: "Final remarks and discussion of next steps.",
    },
  ],
  behavioral: [
    {
      value: "introduction",
      label: "Introduction",
      description: "Building rapport and setting the tone of the interview.",
    },
    {
      value: "past-experiences",
      label: "Past Experiences",
      description:
        "Discussion of how the candidate has handled specific situations in previous jobs.",
    },
    {
      value: "problem-solving",
      label: "Problem-Solving",
      description:
        "Candidate provides examples of how they approached and resolved challenges.",
    },
    {
      value: "teamwork-leadership",
      label: "Teamwork and Leadership",
      description: "Examples of collaboration and leadership skills in action.",
    },
    {
      value: "adaptability",
      label: "Adaptability",
      description: "How the candidate handles change or new environments.",
    },
    {
      value: "cultural-fit",
      label: "Cultural Fit",
      description:
        "Questions about the candidate’s alignment with the company’s values and mission.",
    },
    {
      value: "closing",
      label: "Closing",
      description: "Final questions and next steps.",
    },
  ],
  conceptualSkillsAssessment: [
    {
      value: "introduction",
      label: "Introduction",
      description:
        "Introduction to the interviewer and an overview of the concepts and skills to be discussed.",
    },
    {
      value: "conceptual-discussion",
      label: "Conceptual Knowledge Discussion",
      description:
        "Discussion of key concepts, models, and principles relevant to the job, such as business frameworks or industry theories.",
    },
    {
      value: "competency-assessment",
      label: "Competency Assessment",
      description:
        "Evaluation of the candidate's ability to apply their conceptual knowledge in real-world scenarios through problem-solving or analysis.",
    },
    {
      value: "skills-evaluation",
      label: "Skills Evaluation",
      description:
        "Assessment of specific job-related skills, such as decision-making, problem-solving, or using relevant methodologies and frameworks.",
    },
    {
      value: "deep-dive-topics",
      label: "Deep Dive on Industry Standards",
      description:
        "In-depth discussion of industry standards, best practices, and methodologies relevant to the job role.",
    },
    {
      value: "candidate-questions",
      label: "Questions from the Candidate",
      description:
        "Opportunity for the candidate to ask questions about the team, job role, or company processes.",
    },
    {
      value: "closing",
      label: "Closing",
      description: "Summary of key points and discussion of next steps.",
    },
  ],
  technical: [
    {
      value: "introduction",
      label: "Introduction",
      description:
        "Introduction to the interviewer and the technical topics to be covered.",
    },
    {
      value: "technical-problem-discussion",
      label: "Technical Problem Discussion",
      description:
        "Discuss the candidate's approach to solving technical problems.",
    },
    {
      value: "hands-on-task",
      label: "Hands-on Coding/Task",
      description:
        "Live coding or a technical task that requires immediate problem-solving.",
    },
    {
      value: "solution-review",
      label: "Solution Review",
      description:
        "Review the candidate’s solution and explore alternate solutions.",
    },
    {
      value: "deep-dive-skills",
      label: "Deep Dive on Skills",
      description:
        "Detailed discussion on specific technologies, tools, or frameworks.",
    },
    {
      value: "questions-for-interviewer",
      label: "Questions for the Interviewer",
      description:
        "Candidate asks questions related to the team, technologies used, or technical challenges.",
    },
    {
      value: "closing",
      label: "Closing",
      description: "Summary of next steps.",
    },
  ],
  case: [
    {
      value: "introduction",
      label: "Introduction",
      description: "Introduction and explanation of the case format.",
    },
    {
      value: "problem-presentation",
      label: "Problem Presentation",
      description:
        "Candidate is presented with a business problem or scenario.",
    },
    {
      value: "clarification-questions",
      label: "Clarification and Questions",
      description:
        "Candidate asks clarifying questions about the case problem.",
    },
    {
      value: "problem-solving-approach",
      label: "Problem Solving Approach",
      description: "Candidate outlines their approach to solving the problem.",
    },
    {
      value: "analysis-solution",
      label: "Analysis and Solution",
      description:
        "Candidate works through the case and presents their solution.",
    },
    {
      value: "recommendations",
      label: "Recommendations",
      description: "Candidate offers recommendations based on their solution.",
    },
    {
      value: "review-feedback",
      label: "Review and Feedback",
      description: "Discuss the candidate's approach and thought process.",
    },
  ],
  situational: [
    {
      value: "introduction",
      label: "Introduction",
      description:
        "Initial discussion of how the interview will be structured.",
    },
    {
      value: "scenario-presentation",
      label: "Scenario Presentation",
      description:
        "The interviewer presents a hypothetical job-related scenario.",
    },
    {
      value: "problem-understanding",
      label: "Problem Understanding",
      description: "Candidate asks questions to fully understand the scenario.",
    },
    {
      value: "decision-making",
      label: "Decision-Making",
      description: "Candidate explains how they would approach the scenario.",
    },
    {
      value: "problem-solving",
      label: "Problem-Solving",
      description:
        "In-depth discussion of the candidate’s reasoning and choices.",
    },
    {
      value: "outcome-evaluation",
      label: "Outcome Evaluation",
      description:
        "The interviewer explores how the candidate evaluates success or failure.",
    },
    {
      value: "closing",
      label: "Closing",
      description: "Final remarks and discussion of next steps.",
    },
  ],
  panel: [
    {
      value: "introduction",
      label: "Introduction",
      description:
        "Each panel member introduces themselves, and the candidate gives a brief introduction.",
    },
    {
      value: "role-specific-questions",
      label: "Role-Specific Questions",
      description:
        "Each panel member asks questions related to their specific area of interest or expertise.",
    },
    {
      value: "behavioral-questions",
      label: "Behavioral Questions",
      description:
        "Panel members ask about past experiences related to teamwork, leadership, or conflict resolution.",
    },
    {
      value: "technical-skills-assessment",
      label: "Technical or Skills Assessment",
      description:
        "If applicable, panel members evaluate the candidate’s technical or role-specific skills.",
    },
    {
      value: "collaboration-team-fit",
      label: "Collaboration and Team Fit",
      description:
        "Discussion of how the candidate would fit into the team and work with others.",
    },
    {
      value: "candidate-questions",
      label: "Candidate Questions",
      description:
        "The candidate has the opportunity to ask questions to the entire panel.",
    },
    {
      value: "closing",
      label: "Closing",
      description: "Final remarks and next steps.",
    },
  ],
};
