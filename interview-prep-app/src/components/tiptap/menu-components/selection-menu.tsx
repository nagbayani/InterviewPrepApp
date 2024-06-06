"use client";
import "../../../styles/tiptapBubbleMenu.css";

import { Editor } from "@tiptap/core";
import { useState } from "react";
import Tippy from "@tippyjs/react";

import { RiText } from "react-icons/ri";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";
import { GoListOrdered } from "react-icons/go";
import { FaListUl } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

export const NodeTypes = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonText = () => {
    if (editor.isActive("heading", { level: 1 })) {
      return "Heading 1";
    }
    if (editor.isActive("heading", { level: 2 })) {
      return "Heading 2";
    }
    if (editor.isActive("heading", { level: 3 })) {
      return "Heading 3";
    }
    if (editor.isActive("orderedList")) {
      return "Numbered list";
    }
    if (editor.isActive("bulletList")) {
      return "Bulleted list";
    }

    return "Normal text";
  };
  const isOnlyParagraph =
    !editor.isActive("bulletList") &&
    !editor.isActive("orderedList") &&
    !editor.isActive("heading");

  return (
    <Tippy
      appendTo={document.body}
      trigger='click'
      interactive
      animation='shift-toward-subtle'
      placement='bottom-start'
      content={
        <div className='absolute flex flex-col px-2 py-1 bg-white w-52 z-50'>
          <div className='py-1 ml-2 text-xs text-gray-500 uppercase'>
            Turn into
          </div>
          <button
            type='button'
            className='flex items-center justify-between node-type-dropdown-button hover:bg-slate-100'
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <div className='flex items-center align-middle'>
              <RiText />
              <span className='ml-1'>Text</span>
            </div>
            {isOnlyParagraph && <IoChevronDown />}
          </button>
          <button
            type='button'
            className='flex items-center justify-between node-type-dropdown-button hover:bg-slate-100'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <div className='flex items-center align-middle'>
              <LuHeading1 />
              <span className='ml-1'>Heading 1</span>
            </div>
            {editor.isActive("heading", { level: 1 }) && <IoChevronDown />}
          </button>
          <button
            type='button'
            className='flex items-center justify-between node-type-dropdown-button hover:bg-slate-100'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <div className='flex items-center align-middle'>
              <LuHeading2 />
              <span className='ml-1'>Heading 2</span>
            </div>
            {editor.isActive("heading", { level: 2 }) && <IoChevronDown />}
          </button>
          <button
            type='button'
            className='flex items-center justify-between node-type-dropdown-button hover:bg-slate-100'
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <div className='flex items-center align-middle'>
              <LuHeading3 />
              <span className='ml-1'>Heading 3</span>
            </div>
            {editor.isActive("heading", { level: 3 }) && <IoChevronDown />}
          </button>
          <button
            type='button'
            className='flex items-center justify-between node-type-dropdown-button hover:bg-slate-100'
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <div className='flex items-center align-middle'>
              <GoListOrdered />
              <span className='ml-1'>Numbered list</span>
            </div>
            {editor.isActive("orderedList") && <IoChevronDown />}
          </button>
          <button
            type='button'
            className='flex items-center justify-between node-type-dropdown-button hover:bg-slate-100'
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <div className='flex items-center align-middle'>
              <FaListUl />
              <span className='ml-1'>Bulleted list</span>
            </div>
            {editor.isActive("bulletList") && <IoChevronDown />}
          </button>
        </div>
      }
    >
      <button
        type='button'
        className='flex items-center justify-between w-28 bubble-menu-button cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='truncate'>{buttonText()}</span>
        <IoChevronDown />
      </button>
    </Tippy>
  );
};
