// Default tags for cards with corresponding colors from tagColors
export const defaultTags = [
  { name: "Behavioral", color: "#E6F0FF" }, // blue
  { name: "Communication", color: "#E6F5E6" }, // green
  { name: "Personal Values", color: "#FFFBE6" }, // yellow
  { name: "Situational", color: "#FFE6E6" }, // red
  { name: "Technical", color: "#F0E6FF" }, // purple
  { name: "Background", color: "#FFEDE6" }, // orange
  { name: "Experience", color: "#F5EFE6" }, // brown
  { name: "Work-Culture", color: "#FFE6F2" }, // pink
];

// Default themes and questions for user decks
export const defaultThemes = [
  {
    title: "Career Transitions and Growth",
    description:
      "Explore how and why users have moved through different stages of their career.",
    cards: [
      {
        question: "What motivated you to pursue this career path?",
        tags: ["Background"],
      },
      {
        question: "How did you transition between roles or industries?",
        tags: ["Experience"],
      },
      {
        question:
          "What skills or lessons did you carry forward from each position?",
        tags: ["Technical", "Experience"],
      },
    ],
  },
  {
    title: "Skills Development",
    description:
      "Highlight specific skills users have acquired and how they’ve applied them.",
    cards: [
      {
        question: "What are your strongest technical or soft skills?",
        tags: ["Technical", "Behavioral"],
      },
      {
        question:
          "Can you provide examples of how you applied these skills to solve real-world problems?",
        tags: ["Technical", "Situational"],
      },
      {
        question:
          "How have you grown your skillset in response to challenges or new roles?",
        tags: ["Experience", "Work-Culture"],
      },
    ],
  },
  {
    title: "Accomplishments and Impact",
    description:
      "Focus on key achievements that demonstrate value and contribution.",
    cards: [
      {
        question:
          "What is the most impactful project or task you’ve worked on?",
        tags: ["Experience"],
      },
      {
        question:
          "How did your work improve outcomes, performance, or efficiency in your team or company?",
        tags: ["Situational", "Work-Culture"],
      },
      {
        question:
          "Can you describe a moment when your work significantly contributed to the organization’s success?",
        tags: ["Work-Culture", "Personal Values"],
      },
    ],
  },
  {
    title: "Problem-Solving and Challenges",
    description:
      "Understand how users handle challenges and approach problem-solving.",
    cards: [
      {
        question:
          "Can you describe a major challenge you faced and how you approached solving it?",
        tags: ["Situational", "Technical"],
      },
      {
        question:
          "What is your problem-solving process when faced with ambiguity or unexpected issues?",
        tags: ["Behavioral"],
      },
      {
        question: "How have you learned from failure or mistakes in the past?",
        tags: ["Behavioral", "Work-Culture"],
      },
    ],
  },
  {
    title: "Collaboration and Leadership",
    description:
      "Highlight teamwork and leadership abilities, relevant in most roles.",
    cards: [
      {
        question:
          "Can you share an experience where you worked in a team to achieve a common goal?",
        tags: ["Communication", "Work-Culture"],
      },
      {
        question:
          "How do you approach conflict resolution or managing diverse perspectives?",
        tags: ["Communication", "Personal Values"],
      },
      {
        question:
          "Have you taken on leadership roles? If so, how did you manage your team and drive results?",
        tags: ["Work-Culture", "Leadership"],
      },
    ],
  },
  {
    title: "Adaptability and Learning",
    description: "Show how users adapt to changes and continuously learn.",
    cards: [
      {
        question:
          "How have you adapted to new technologies or industry trends in your career?",
        tags: ["Technical", "Experience"],
      },
      {
        question:
          "Can you give an example of how you’ve continuously learned and developed new skills?",
        tags: ["Experience", "Work-Culture"],
      },
      {
        question:
          "What’s a time when you had to step outside of your comfort zone to achieve success?",
        tags: ["Personal Values", "Work-Culture"],
      },
    ],
  },
  {
    title: "Career Goals and Vision",
    description:
      "Clarify future career aspirations and how past experiences support these goals.",
    cards: [
      {
        question: "Where do you see your career heading in the next few years?",
        tags: ["Personal Values", "Experience"],
      },
      {
        question:
          "How do your past experiences align with your long-term career goals?",
        tags: ["Experience", "Personal Values"],
      },
      {
        question:
          "What motivates you to pursue the roles or industries you’re aiming for?",
        tags: ["Personal Values"],
      },
    ],
  },
];
