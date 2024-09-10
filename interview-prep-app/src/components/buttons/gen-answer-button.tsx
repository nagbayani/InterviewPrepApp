import React, { useState } from "react";
import { Button } from "../ui/button";

interface GenAnswerButtonProps {
  onClick: () => void;
  status: "idle" | "saving" | "saved"; // Added status prop
}

const GenAnswerButton = ({ onClick, status }: GenAnswerButtonProps) => {
  return (
    <Button onClick={onClick}>
      {status === "idle" && "Generate Answer"}
      {status === "saving" && "Generating..."}
      {status === "saved" && "Regenerate Answer"}
    </Button>
  );
};

export default GenAnswerButton;
