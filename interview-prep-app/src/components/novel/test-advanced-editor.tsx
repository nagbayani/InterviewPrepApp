"use client";
import React, { useEffect, useState } from "react";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  type JSONContent,
  type EditorInstance,
  EditorCommandList,
  EditorBubble,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";
import { TextButtons } from "./selectors/text-buttons";
import { useEditor, EditorContent } from "@tiptap/react";
import { useDebouncedCallback } from "use-debounce";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";
import { Separator } from "../ui/separator";
import { defaultValue } from "@/lib/content";
import "../../styles/prosemirror.css";
import { TiptapEditorProps } from "./props";

const extensions = [...defaultExtensions];

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
}

const Editor = ({ initialValue, onChange }: EditorProp) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);
  const [initialContent, setInitialContent] = useState<null | JSONContent>(
    null
  );
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [charsCount, setCharsCount] = useState<number | undefined>(undefined);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 750);

  const editor = useEditor({
    extensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Unsaved");
      const selection = e.editor.state.selection;
      const lastTwo = e.editor.state.doc.textBetween(
        selection.from - 2,
        selection.from,
        "\n"
      );
      if (lastTwo === "++") {
        e.editor.commands.deleteRange({
          from: selection.from - 2,
          to: selection.from,
        });
        // complete(e.editor.getText());
        // va.track("Autocomplete Shortcut Used");
      } else {
        debouncedUpdates(e);
      }
      onChange(e.editor.getJSON());
    },
    autofocus: "end",
  });
  useEffect(() => {
    if (editor && initialValue) {
      editor.commands.setContent(initialValue);
    } else {
      const content = window.localStorage.getItem("novel-content");
      const parsedContent = content ? JSON.parse(content) : defaultValue;
      editor!.commands.setContent(parsedContent);
    }
  }, [editor, initialValue]);

  // if (!editor) return null;
  if (!initialContent) return null;

  return (
    <div className='relative w-full max-w-screen-lg'>
      <div className='flex absolute right-5 top-5 z-10 mb-5 gap-2'>
        <div className='rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground'>
          {saveStatus}
        </div>
        <div
          className={
            charsCount
              ? "rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground"
              : "hidden"
          }
        >
          {charsCount} Words
        </div>
      </div>
      <EditorRoot>
        <EditorContent
          className='border p-8 rounded-xl overflow-y-auto h-[500px] min-h-full bg-background shadow-xl'
          editor={editor}
          // content={initialContent}
        >
          <ImageResizer />
          <EditorBubble
            tippyOptions={{ placement: "top" }}
            className='flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl'
          >
            <Separator orientation='vertical' />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation='vertical' />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation='vertical' />
            <TextButtons />
            <Separator orientation='vertical' />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </EditorBubble>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default Editor;
