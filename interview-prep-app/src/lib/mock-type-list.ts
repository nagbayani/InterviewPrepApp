interface MockType {
  value: string;
  label: string;
  description: string;
  useCase: string;
}
export const mockTypeList: MockType[] = [
  {
    value: "individual",
    label: "Individual Interview",
    description:
      "A one-on-one interview between the candidate and a single interviewer, focusing on qualifications, experience, and fit.",
    useCase:
      "The most common interview format, used across industries for assessing a candidate’s direct fit for a role.",
  },
  {
    value: "technical",
    label: "Technical Interview",
    description:
      "An interview that assesses specific technical skills and knowledge related to the job, often involving coding challenges, problem-solving tasks, or technical questions.",
    useCase: "Common in IT, engineering, and other technical fields.",
  },
  {
    value: "behavioral",
    label: "Behavioral-Based Interview",
    description:
      "An interview focusing on how the candidate has handled past situations, using the premise that past behavior predicts future performance.",
    useCase:
      "Ideal for assessing how candidates have dealt with challenges and applied their skills in real-world scenarios.",
  },
  {
    value: "case",
    label: "Case Interview",
    description:
      "An interview format where candidates are presented with a business problem or scenario and asked to provide a solution, demonstrating analytical and problem-solving abilities.",
    useCase: "Frequently used in consulting and management positions.",
  },
  {
    value: "situational",
    label: "Situational Interview",
    description:
      "An interview where candidates are presented with hypothetical scenarios related to the job and asked how they would handle them, assessing problem-solving and decision-making skills.",
    useCase: "Useful for roles requiring strong situational judgment.",
  },
  {
    value: "informational",
    label: "Informational Interview",
    description:
      "A meeting to gather information about a specific career, industry, or company, typically not for a specific job opening.",
    useCase:
      "Useful for exploring career paths, networking, and gathering insights from professionals in a field of interest.",
  },
  {
    value: "screening",
    label: "Screening or Telephone Interview",
    description:
      "An initial interview conducted over the phone to assess basic qualifications and fit before proceeding to more in-depth interviews.",
    useCase:
      "Commonly used by recruiters and HR professionals to narrow down candidates before scheduling in-person interviews.",
  },
  {
    value: "on-site",
    label: "On-Site Interview",
    description:
      "An in-person interview at the employer’s location, which may include multiple interviewers and various assessment activities.",
    useCase:
      "Commonly used for final stages of the hiring process, allowing the candidate to meet the team and see the work environment.",
  },
  {
    value: "task-oriented",
    label: "Task-Oriented or Testing Interview",
    description:
      "An interview that includes practical tasks or tests to evaluate specific skills or competencies relevant to the job.",
    useCase:
      "Common in technical and skill-based roles where hands-on testing is crucial to evaluating a candidate’s abilities.",
  },
  {
    value: "stress",
    label: "Stress Interview",
    description:
      "An interview designed to assess how candidates handle stress, pressure, and unexpected challenges, often by creating a tense or confrontational environment.",
    useCase:
      "Useful for roles in high-pressure environments where stress management is key, such as emergency services or sales.",
  },
  {
    value: "panel",
    label: "Small Group / Committee / Panel Interview",
    description:
      "An interview conducted by multiple interviewers simultaneously, often used to assess how candidates handle group dynamics and pressure.",
    useCase:
      "Useful in collaborative environments where the candidate will work closely with multiple team members or stakeholders.",
  },
  {
    value: "panel-technical",
    label: "Panel Technical Interview",
    description:
      "A combination of panel and technical interviews, where multiple technical experts assess the candidate’s technical abilities simultaneously.",
    useCase: "Common in specialized technical roles.",
  },
  {
    value: "group",
    label: "Group Interview",
    description:
      "An interview where multiple candidates are interviewed simultaneously, often involving group activities or discussions to evaluate teamwork and interpersonal skills.",
    useCase: "Useful for roles that require strong collaboration and teamwork.",
  },
  {
    value: "video",
    label: "Video Interview",
    description:
      "An interview conducted via video conferencing tools, which can be either live or recorded, assessing communication skills and adaptability to remote work environments.",
    useCase: "Increasingly common due to remote work trends.",
  },
  {
    value: "competency",
    label: "Competency-Based Interview",
    description:
      "An interview focused on specific competencies or skills required for the job, often using structured questions to assess each competency.",
    useCase:
      "Useful for roles requiring a specific set of skills or behaviors.",
  },
];
