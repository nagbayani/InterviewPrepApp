import {
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  TextIcon,
  TextQuote,
  type LucideIcon,
} from "lucide-react";
import { Editor } from "@tiptap/react";

export type SelectorItem = {
  name: string;
  icon: LucideIcon;
  command: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
};

const getSelectedNodes = (editor: Editor) => {
  const { from, to } = editor.state.selection;
  const nodes: any = [];
  editor.state.doc.nodesBetween(from, to, (node, pos) => {
    nodes.push({ node, pos });
  });
  return nodes;
};

export const items: SelectorItem[] = [
  {
    name: "Text",
    icon: TextIcon,
    command: (editor) => {
      editor.chain().focus().clearNodes().run();
      //       editor.chain().focus().unsetNode('bulletList').unsetNode('orderedList').setParagraph().run();
    },
    isActive: (editor) =>
      editor.isActive("paragraph") &&
      !editor.isActive("bulletList") &&
      !editor.isActive("orderedList"),
  },
  {
    name: "Heading 1",
    icon: Heading1,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  {
    name: "Heading 2",
    icon: Heading2,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    name: "Heading 3",
    icon: Heading3,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  {
    name: "To-do List",
    icon: CheckSquare,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: (editor) => editor.isActive("taskItem"),
  },

  {
    name: "Bullet List",
    icon: ListOrdered,
    command: (editor) => {
      // const { from, to } = editor.state.selection;
      editor.chain().focus().clearNodes().toggleBulletList().run();
    },
    isActive: (editor) => editor.isActive("bulletList"),
  },
  // {
  //   name: "Bullet List",
  //   icon: ListOrdered,
  //   command: (editor) => {
  //     const { from, to } = editor.state.selection;
  //     const nodes: { node: any; pos: number }[] = [];
  //     editor.state.doc.nodesBetween(from, to, (node, pos) => {
  //       nodes.push({ node, pos });
  //     });
  //     console.log("Command Selected Nodes", nodes);

  //     // Apply the command to each selected node
  //     nodes.forEach(({ node, pos }) => {
  //       console.log("node", node, "node type", node.type.name);
  //       // editor.commands.setTextSelection(pos);
  //       // editor.commands.toggleBulletList();
  //       // editor.commands.setTextSelection(pos);
  //       // editor.commands.toggleBulletList();
  //       if (node.type.name === "paragraph") {
  //         editor
  //           .chain()
  //           .clearNodes()
  //           .setTextSelection({ from: pos, to: pos + node.nodeSize })
  //           .toggleBulletList()
  //           .run();
  //       }
  //     });

  //     // Restore the original selection
  //     // editor.commands.setTextSelection({ from, to });
  //   },
  //   isActive: (editor) => editor.isActive("bulletList"),
  // },
  {
    name: "Numbered List",
    icon: ListOrdered,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  {
    name: "Quote",
    icon: TextQuote,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    name: "Code",
    icon: Code,
    command: (editor) =>
      editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
];
