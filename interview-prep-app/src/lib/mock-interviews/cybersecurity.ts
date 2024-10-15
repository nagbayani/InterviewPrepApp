import { IndustryMockInterview, Industry } from "./types";
import { ShieldAlert } from "lucide-react";

export const cybersecurity: Industry = {
  value: "cybersecurity",
  label: "Cybersecurity",
  icon: ShieldAlert,
  interviews: [
    {
      value: "data_protection_regulations",
      label: "Data Protection Regulations",
      purpose:
        "Discuss data protection laws and regulations, such as GDPR, HIPAA, and CCPA, focusing on how they impact cybersecurity practices.",
      description: "Data protection laws and cybersecurity impact",
    },
    {
      value: "penetration_testing",
      label: "Penetration Testing",
      purpose:
        "Explain your approach to penetration testing, including methodologies for identifying vulnerabilities and securing systems from potential attacks.",
      description: "Approach to penetration testing and security",
    },
    {
      value: "vulnerability_assessment",
      label: "Vulnerability Assessment",
      purpose:
        "Discuss methods for detecting vulnerabilities in systems and networks, focusing on tools and techniques used for risk identification and mitigation.",
      description: "Methods for detecting vulnerabilities in systems",
    },
    {
      value: "cybersecurity_strategy",
      label: "Cybersecurity Strategy",
      purpose:
        "Explore your overall cybersecurity strategy, including policies, technologies, and processes to protect an organization’s digital assets.",
      description: "Overall cybersecurity strategy and protection",
    },
    {
      value: "incident_response_plan",
      label: "Incident Response Plan",
      purpose:
        "Explain the steps involved in your incident response plan, from detecting breaches to mitigating damage and recovering from cyber incidents.",
      description: "Steps involved in incident response planning",
    },
    {
      value: "threat_intelligence",
      label: "Threat Intelligence",
      purpose:
        "Discuss methods for gathering and analyzing threat intelligence to proactively detect and defend against potential cyber threats.",
      description: "Methods for gathering and analyzing threat intelligence",
    },
    {
      value: "physical_security_measures",
      label: "Physical Security Measures",
      purpose:
        "Explore physical security practices in the context of cybersecurity, including securing facilities, data centers, and sensitive hardware.",
      description: "Physical security measures in cybersecurity",
    },
    {
      value: "security_compliance_standards",
      label: "Security Compliance Standards",
      purpose:
        "Discuss compliance with security standards like ISO 27001, NIST, and PCI-DSS, and how you ensure adherence to these standards.",
      description: "Compliance with security standards and adherence",
    },
    {
      value: "network_security_protocols",
      label: "Network Security Protocols",
      purpose:
        "Explain your methods for securing networks, including the use of firewalls, encryption, and access controls to protect data.",
      description: "Methods for securing networks and data protection",
    },
    {
      value: "risk_assessment",
      label: "Risk Assessment",
      purpose:
        "Discuss your approach to conducting risk assessments, evaluating potential threats, vulnerabilities, and the likelihood of security breaches.",
      description: "Approach to conducting risk assessments",
    },
    {
      value: "identity_access_management",
      label: "Identity and Access Management (IAM)",
      purpose:
        "Discuss IAM strategies, including user authentication, access controls, and managing privileged accounts to protect sensitive information.",
      description: "Identity and access management strategies",
    },
    {
      value: "cloud_security",
      label: "Cloud Security",
      purpose:
        "Explore strategies for securing cloud environments, including data encryption, identity management, and multi-factor authentication.",
      description: "Strategies for securing cloud environments",
    },
    {
      value: "cyber_forensics",
      label: "Cyber Forensics",
      purpose:
        "Discuss techniques used in cyber forensics to investigate security breaches, including evidence collection, data recovery, and legal considerations.",
      description: "Cyber forensics and investigation techniques",
    },
    {
      value: "security_auditing",
      label: "Security Auditing",
      purpose:
        "Explain how you perform security audits to ensure systems, processes, and controls are in place and functioning as expected.",
      description: "Performing security audits and ensuring control",
    },
    {
      value: "disaster_recovery",
      label: "Disaster Recovery and Business Continuity",
      purpose:
        "Discuss strategies for disaster recovery and business continuity, focusing on maintaining operations during and after a cyberattack.",
      description: "Strategies for disaster recovery and continuity",
    },
    {
      value: "social_engineering_awareness",
      label: "Social Engineering Awareness",
      purpose:
        "Explore methods for educating employees on social engineering attacks, including phishing, spear phishing, and baiting techniques.",
      description: "Educating employees on social engineering",
    },
    {
      value: "encryption_cryptography",
      label: "Encryption and Cryptography",
      purpose:
        "Explain how encryption and cryptographic methods are used to protect data in transit and at rest, focusing on current best practices.",
      description: "Encryption and cryptographic methods in data protection",
    },
    {
      value: "zero_trust_architecture",
      label: "Zero Trust Architecture",
      purpose:
        "Discuss the principles of zero trust security models, where no one is trusted by default and access is granted based on verification at every stage.",
      description: "Principles of zero trust security models",
    },
  ],
};
