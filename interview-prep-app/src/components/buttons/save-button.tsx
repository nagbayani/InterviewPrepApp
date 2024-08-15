import React, { useState } from "react";
import "../../styles/saveButton.css";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

const SaveButton = ({
  status,
  onClick,
}: {
  status: "idle" | "saving" | "saved";
  onClick: () => void;
}) => {
  return (
    <Button onClick={onClick}>
      {status === "idle" && "Save Card"}
      {status === "saving" && (
        <div id='spin-container'>
          <div id='html-spinner'></div>
          Saving...
        </div>
      )}
      {status === "saved" && (
        <div className='flex items-center gap-2'>
          <Check />
          Saved
        </div>
      )}
    </Button>
  );
};

export default SaveButton;
