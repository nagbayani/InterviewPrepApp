import { LucideIcon } from "lucide-react"; // Assuming you're using lucide-react for icons

export type IndustryMockInterview = {
  value: string;
  label: string;
  purpose: string;
  description: string;
};
// Define the industry structure
export type Industry = {
  value: string;
  label: string;
  icon: LucideIcon; // Assuming you're using Lucide icons
  interviews: IndustryMockInterview[];
};
