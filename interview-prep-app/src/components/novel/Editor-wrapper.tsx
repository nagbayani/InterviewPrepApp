"use client";

import Editor from "@/components/novel/advanced-editor";
// import { ThemeToggle } from "@/components/theme-toggle";
import { JSONContent } from "novel";
import { useState } from "react";
import { defaultValue } from "@/lib/content";

export default function EditorWrapper() {
  const [value, setValue] = useState<JSONContent>(defaultValue);
  console.log(value);
  return (
    <div className='flex flex-col p-6 border  w-full gap-6 rounded-md bg-card'>
      <Editor initialValue={value} onChange={setValue} />
    </div>
  );
}
