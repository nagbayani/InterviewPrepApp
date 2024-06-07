"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { Editor } from "novel";

import { useEffect, useState } from "react";

//tiptap imports
import TextEditor from "@/components/tiptap/TextEditor";

// implement a stack
// keywords option
// sections
// list option
const PromptAnswer = () => {
  // ul list for buttons
  // press button add a new node in list
  // stack

  return (
    <div>
      <ul className='flex justify-between'>
        <li>
          <Button>Add Group</Button>
        </li>
      </ul>
      {/* <TextEditor /> */}
    </div>
  );
};
/*
Default Text Editor
  https://tiptap.dev/docs/editor/examples/default

Menus 
  https://tiptap.dev/docs/editor/examples/menus

*/

export default PromptAnswer;
