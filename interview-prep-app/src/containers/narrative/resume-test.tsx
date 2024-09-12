"use client";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const UploadResumeDialog = () => {
  const [resumeText, setResumeText] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [projects, setProjects] = useState("");

  const uploadResume = async () => {
    try {
      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: JSON.stringify({ resumeText }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        // Clean the jobDetails from backticks and ensure it's a valid JSON string
        const cleanedResume = data.resume.replace(/```json|```/g, "");
        const parsedResume = JSON.parse(cleanedResume);
        setSkills(parsedResume.skills);
        setExperience(parsedResume.experience);
        setProjects(parsedResume.projects);
        console.log("Resume uploaded successfully:", data);
      }
    } catch (error) {}
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user-resume", {
        method: "POST",
        body: JSON.stringify({ skills, experience, projects }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log("Resume saved successfully:", data);
      }
    } catch (error) {
      console.log("Error saving resume text:", error);
    }
    // Handle saving the resume text (store in your database, state, etc.)
    console.log("Resume text:", resumeText);
    // You can call your Prisma API here to save the resume text to the UserResume table
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Upload Resume</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Paste Your Resume</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder='Paste the text of your resume here'
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className='h-64'
        />
        <DialogFooter>
          <Button onClick={uploadResume} variant={"outline"}>
            Upload Resume
          </Button>
          <Button onClick={handleSave}>Save Resume</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadResumeDialog;
