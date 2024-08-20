import { Editor } from "@tiptap/core";
import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import { useCallback, useState, useEffect } from "react";
import "tippy.js/animations/shift-toward-subtle.css";
import { EditorClass } from "./proseClassString";
import { getExtensions } from "./custom-extensions";
import { CustomBubbleMenu } from "./menus";
import { useDebouncedCallback } from "use-debounce";

interface EditorProp {
  initialValue?: JSONContent;
  onChange: (value: JSONContent) => void;
  onTextChange: (text: string) => void; // Extract text from the Editor
  onSave: () => void;
}

export const TipTapEditor = ({
  initialValue,
  onChange,
  onTextChange,
  onSave,
}: EditorProp) => {
  const logContent = useCallback((e: Editor) => console.log(e.getJSON()), []);

  const [isAddingNewLink, setIsAddingNewLink] = useState(false);

  const openLinkModal = () => setIsAddingNewLink(true);

  const closeLinkModal = () => setIsAddingNewLink(false);

  const [saveStatus, setSaveStatus] = useState("Saved");

  // SAVE CONTENT
  const [initialContent, setInitialContent] = useState<undefined | JSONContent>(
    initialValue
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "s") {
        event.preventDefault();
        onSave(); // Trigger the save function
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onSave]);

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    setSaveStatus("Saving...");
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 750);

  const editor = useEditor({
    extensions: getExtensions({ openLinkModal }),
    content: initialValue,
    editorProps: {
      attributes: {
        class: `${EditorClass} focus:outline-none w-full`,
        spellcheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    onUpdate: ({ editor }) => {
      debouncedUpdates({ editor });
      onChange(editor.getJSON());
      onTextChange(editor.getText());
      setSaveStatus("Unsaved");
    },
    // onUpdate: debounce(({ editor: e }) => {
    //   logContent(e);
    // }, 500),
  });

  // useEffect(() => {
  //   if (editor && initialValue) {
  //     editor.commands.setContent(initialValue, false);
  //   }
  // }, [editor, initialValue]);

  // const addTable = () =>
  //   editor?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });

  return (
    editor && (
      // <section className='flex flex-col gap-4 w-full border-red-600 border-2 justify-center'>
      //   </section>
      <>
        <EditorContent
          className='w-full flex justify-center min-h-[500px] max-h-[500px] border-black border-2 overflow-y-scroll'
          editor={editor}
        />

        <CustomBubbleMenu editor={editor} />
      </>
    )
  );
};
