import { IndustryMockInterview, Industry } from "./types";
import { Code } from "lucide-react"; // Lucide icon for Software

export const software: Industry = {
  value: "software",
  label: "Software",
  icon: Code,
  interviews: [
    {
      value: "devops_fundamentals",
      label: "DevOps Fundamentals",
      purpose:
        "Assess the candidate’s understanding of DevOps practices, including continuous integration, deployment, infrastructure as code, and automated workflows.",
      description: "Understanding DevOps and deployment workflows",
    },
    {
      value: "sql_database_talk",
      label: "SQL & Database Talk",
      purpose:
        "Evaluate the candidate’s proficiency in SQL and database management, focusing on querying, optimization, and schema design.",
      description: "SQL proficiency and database management",
    },
    {
      value: "behavioral_insights",
      label: "Behavioral Insights",
      purpose:
        "Discuss the candidate’s ability to handle teamwork, communication, and conflict resolution in software development projects.",
      description: "Teamwork and communication in projects",
    },
    {
      value: "javascript_mastery",
      label: "JavaScript Mastery",
      purpose:
        "Test the candidate’s expertise in JavaScript, including advanced concepts such as closures, async programming, and ES6+ features.",
      description: "Advanced JavaScript concepts mastery",
    },
    {
      value: "system_design_basics",
      label: "System Design Basics",
      purpose:
        "Explore the candidate’s ability to design scalable, high-performance systems, discussing architecture, data flow, and trade-offs.",
      description: "Design scalable, high-performance systems",
    },
    {
      value: "frontend_101",
      label: "Front-End 101",
      purpose:
        "Assess the candidate’s skills in front-end development, including HTML, CSS, JavaScript frameworks (e.g., React, Angular), and user interface design.",
      description: "Front-end development and frameworks",
    },
    {
      value: "low_level_design",
      label: "Low-Level Design",
      purpose:
        "Evaluate the candidate’s ability to implement detailed software designs, covering object-oriented principles, design patterns, and modularity.",
      description: "Detailed software design principles",
    },
    {
      value: "coding_concepts_basics",
      label: "Coding Concepts Basics",
      purpose:
        "Review foundational coding concepts, including data structures, algorithms, and problem-solving techniques.",
      description: "Basic coding, algorithms, and structures",
    },
    {
      value: "testing_automation",
      label: "Testing & Automation",
      purpose:
        "Discuss the candidate’s experience with writing unit tests, integration tests, and automating testing processes using tools like Selenium or Jenkins.",
      description: "Testing and automation skills",
    },
    {
      value: "cloud_computing",
      label: "Cloud Computing",
      purpose:
        "Evaluate the candidate’s knowledge of cloud platforms (e.g., AWS, Azure, Google Cloud), focusing on cloud architecture and services.",
      description: "Cloud platforms and architecture knowledge",
    },
    {
      value: "api_design_integration",
      label: "API Design and Integration",
      purpose:
        "Discuss best practices for designing and integrating APIs, including REST, GraphQL, and handling authentication.",
      description: "API design and integration practices",
    },
    {
      value: "version_control_git",
      label: "Version Control (Git)",
      purpose:
        "Test the candidate’s proficiency with version control tools like Git, focusing on branching, merging, and resolving conflicts in collaborative development.",
      description: "Proficiency in Git and version control",
    },
    {
      value: "microservices_architecture",
      label: "Microservices Architecture",
      purpose:
        "Assess the candidate’s understanding of microservices, discussing service decomposition, communication patterns, and deployment strategies.",
      description: "Microservices design and deployment",
    },
    {
      value: "security_fundamentals",
      label: "Security Fundamentals",
      purpose:
        "Evaluate the candidate’s knowledge of software security practices, including secure coding, encryption, and vulnerability management.",
      description: "Knowledge of software security practices",
    },
    {
      value: "agile_development",
      label: "Agile Development",
      purpose:
        "Discuss the candidate’s experience with Agile methodologies, focusing on sprint planning, retrospectives, and delivering iterative improvements.",
      description: "Experience with Agile methodologies",
    },
    {
      value: "performance_optimization",
      label: "Performance Optimization",
      purpose:
        "Explore techniques for optimizing software performance, including memory management, load balancing, and caching strategies.",
      description: "Software performance optimization techniques",
    },
    {
      value: "ci_cd",
      label: "Continuous Integration/Continuous Deployment (CI/CD)",
      purpose:
        "Discuss the candidate’s experience in setting up CI/CD pipelines, automating deployments, and ensuring software quality in production.",
      description: "CI/CD pipeline and automation",
    },
    {
      value: "containerization",
      label: "Containerization (Docker, Kubernetes)",
      purpose:
        "Assess the candidate’s experience with containerization technologies like Docker and Kubernetes for application deployment and orchestration.",
      description: "Containerization with Docker, Kubernetes",
    },
  ],
};
