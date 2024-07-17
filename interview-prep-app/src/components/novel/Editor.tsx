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
}

export const TipTapEditor = ({ initialValue, onChange }: EditorProp) => {
  const logContent = useCallback((e: Editor) => console.log(e.getJSON()), []);

  const [isAddingNewLink, setIsAddingNewLink] = useState(false);

  const openLinkModal = () => setIsAddingNewLink(true);

  const closeLinkModal = () => setIsAddingNewLink(false);

  const [saveStatus, setSaveStatus] = useState("Saved");

  // SAVE CONTENT
  const [initialContent, setInitialContent] = useState<undefined | JSONContent>(
    initialValue
  );

  // const addImage = () =>
  //   editor?.commands.setMedia({
  //     src: "https://source.unsplash.com/8xznAGy4HcY/800x400",
  //     "media-type": "img",
  //     alt: "Something else",
  //     title: "Something",
  //     width: "800",
  //     height: "400",
  //   });

  // const addVideo = () =>
  //   editor?.commands.setMedia({
  //     src: videoUrl,
  //     "media-type": "video",
  //     alt: "Some Video",
  //     title: "Some Title Video",
  //     width: "400",
  //     height: "400",
  //   });

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
      setSaveStatus("Unsaved");
    },
    // onUpdate: debounce(({ editor: e }) => {
    //   logContent(e);
    // }, 500),
  });

  useEffect(() => {
    if (editor && initialValue) {
      editor.commands.setContent(initialValue);
    }
  }, [editor, initialValue]);

  // const addTable = () =>
  //   editor?.commands.insertTable({ rows: 3, cols: 3, withHeaderRow: true });

  return (
    editor && (
      <section className='flex flex-col gap-2 w-full justify-center'>
        <EditorContent className='w-full flex justify-center' editor={editor} />

        <CustomBubbleMenu editor={editor} />

        {/* <LinkBubbleMenu editor={editor} /> */}
      </section>
    )
  );
};
