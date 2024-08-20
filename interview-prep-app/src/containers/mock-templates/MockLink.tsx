"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { useMockTemplateStore } from "@/_store/mock-store";
// import "../../styles/deck/mockLink.css";

interface MockLinkProps {
  id: string;
  title: string;
  path: string;
}

const MockLink = ({ id, title, path }: MockLinkProps) => {
  const pathname = usePathname();
  const { updateMockTemplate, deleteMockTemplate } = useMockTemplateStore();

  const [titleEditing, setTitleEdit] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [lastNonEmptyTitle, setLastNonEmptyTitle] = useState(title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitleValue(value);
    if (value.trim() !== "") {
      setLastNonEmptyTitle(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Return") {
      e.preventDefault();
      handleInputBlur();
    }
  };

  const handleInputBlur = async () => {
    if (titleValue.trim() === "") {
      setTitleValue(lastNonEmptyTitle);
    } else {
      setLastNonEmptyTitle(titleValue);

      // Update the database and Zustand store
      try {
        const response = await fetch(`/api/mock-templates/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: titleValue }),
        });

        if (response.ok) {
          updateMockTemplate(id, { title: titleValue });
        }
      } catch (error) {
        setTitleValue(title);
        console.error(error);
        alert("Failed to update the title. Please try again.");
      }
    }
    setTitleEdit(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/mock-templates/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        deleteMockTemplate(id);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete the mock template. Please try again.");
    }
  };

  return (
    <div className={`mocklink-container ${pathname === path && "active"}`}>
      <div className='w-full flex justify-between'>
        {titleEditing ? (
          <input
            value={titleValue}
            onChange={handleChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className='input-edit'
          />
        ) : (
          <span onClick={() => setTitleEdit(true)}>{titleValue}</span>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className='w-8 h-8 bg-inherit px-0 py-0 hover:bg-gray-300 text-white font-bold rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center'>
            <Ellipsis size={20} className='text-black' />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}>
            <Link href={path}>
              <DropdownMenuItem>Open</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleDelete} className='text-red-600'>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default MockLink;
