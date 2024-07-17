import { GlobalDragHandle } from "novel/extensions";
import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
  useLayoutEffect,
} from "react";
import { Editor, Range, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import { useCompletion } from "ai/react";
import tippy from "tippy.js";
import { handleImageUpload } from "../image";

import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  MessageSquarePlus,
  Text,
  TextQuote,
  Image as ImageIcon,
  Code,
} from "lucide-react";
import LoadingCircle from "@/components/ui/icons/loading-circle";
import { toast } from "sonner";
import va from "@vercel/analytics";
import Magic from "@/components/ui/icons/magic";

interface Command {
  editor: Editor;
  range: Range;
}

export const suggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: "Insert Paragraph Below",
      description: "Insert a new paragraph below the current one.",
      icon: <Text size={18} />,
      command: ({ editor, range }: Command) => {
        const endPos = range.to;

        editor.commands.focus("start");

        editor
          .chain()
          .insertContentAt(endPos, { type: "paragraph" })
          .focus(endPos)
          .selectNodeForward()
          .scrollIntoView()
          .run();
      },
    },
    {
      title: "Continue writing",
      description: "Use AI to expand your thoughts.",
      icon: <Magic className='w-7 text-black' />,
    },

    {
      title: "Text",
      description: "Just start typing with plain text.",
      icon: <Text size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .run();
      },
    },
    {
      title: "Heading 1",
      description: "Big section heading.",
      icon: <Heading1 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "Heading 2",
      description: "Medium section heading.",
      icon: <Heading2 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "Heading 3",
      description: "Small section heading.",
      icon: <Heading3 size={18} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "Bullet List",
      description: "Create a simple bullet list.",
      icon: <List size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: "Numbered List",
      description: "Create a list with numbering.",
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: "Quote",
      description: "Capture a quote.",
      icon: <TextQuote size={18} />,
      command: ({ editor, range }: Command) =>
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode("paragraph", "paragraph")
          .toggleBlockquote()
          .run(),
    },
    {
      title: "Code",
      description: "Capture a code snippet.",
      icon: <Code size={18} />,
      command: ({ editor, range }: Command) =>
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
    {
      title: "Image",
      description: "Upload an image from your computer.",
      icon: <ImageIcon size={18} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).run();
        // upload image
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (event) => {
          if (input.files?.length) {
            const file = input.files[0];
            return handleImageUpload(file, editor.view, event);
          }
        };
        input.click();
      },
    },
  ].filter((item) => {
    if (typeof query === "string" && query.length > 0) {
      return item.title.toLowerCase().includes(query.toLowerCase());
    }
    return true;
  });
};
