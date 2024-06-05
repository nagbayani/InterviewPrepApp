"use client";
import { Editor } from "@tiptap/react";
import clsx from "clsx"; //utility for constructing className strings conditionally.
import { FaBold, FaItalic } from "react-icons/fa";
import { MdFormatUnderlined } from "react-icons/md";
import { FaStrikethrough } from "react-icons/fa6";
import { CiLink } from "react-icons/ci";

type SelectionMenuType = "link" | null;

const SelectionMenu = ({
  editor,
  selectionType,
  setSelectionType,
}: {
  editor: Editor;
  selectionType: SelectionMenuType;
  setSelectionType: (type: SelectionMenuType) => void;
}) => {
  switch (selectionType) {
    case null:
      return (
        <>
          <button
            type='button'
            data-test-id='mark-bold'
            className={clsx({
              active: editor.isActive("bold"),
            })}
            onClick={() => editor.chain().toggleBold().run()}
          >
            <FaBold />
          </button>

          <button
            type='button'
            data-test-id='mark-italic'
            className={clsx({
              active: editor.isActive("italic"),
            })}
            onClick={() => editor.chain().toggleItalic().run()}
          >
            <FaItalic />
          </button>

          <button
            type='button'
            data-test-id='mark-underline'
            className={clsx({
              active: editor.isActive("underline"),
            })}
            onClick={() => editor.chain().toggleUnderline().run()}
          >
            <MdFormatUnderlined />
          </button>

          <button
            type='button'
            data-test-id='mark-strike'
            className={clsx({
              active: editor.isActive("strike"),
            })}
            onClick={() => editor.chain().toggleStrike().run()}
          >
            <FaStrikethrough />
          </button>

          <button
            type='button'
            data-test-id='mark-link'
            className={clsx({
              active: editor.isActive("link"),
            })}
            onClick={() => {
              setSelectionType("link");
            }}
          >
            <CiLink />
          </button>
        </>
      );

    case "link":
      return (
        <div className='insert-link-box'>
          <input
            data-test-id='insert-link-value'
            autoFocus
            type='text'
            placeholder='Insert link address'
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                editor
                  .chain()
                  .focus()
                  .setLink({
                    href: (event.target as HTMLInputElement).value,
                    target: "_blank",
                  })
                  .run();
                setSelectionType(null);
              }
            }}
          />
        </div>
      );
  }
};

export default SelectionMenu;
