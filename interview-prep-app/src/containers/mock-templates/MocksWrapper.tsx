"use client";

import React, { useState, useEffect } from "react";
import MockLink from "./MockLink";
import { useMockTemplateStore } from "@/_store/mock-store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { MockTemplateData } from "@/types/data-types";
import "../../styles/deck/deck-wrapper.css";
import { AddMockTemplateModal } from "../modal/mocks/add-mock-template-modal";

interface MocksWrapperProps {
  mocks: MockTemplateData[];
}

const MocksWrapper = ({ mocks }: MocksWrapperProps) => {
  // Zustand store:  State Management for Mock Templates
  const { mockTemplates, addMockTemplate, setMockTemplates } =
    useMockTemplateStore((state) => ({
      mockTemplates: state.mockTemplates,
      addMockTemplate: state.addMockTemplate,
      setMockTemplates: state.setMockTemplates,
    }));

  // Update Zustand store with mock template data from database
  useEffect(() => {
    setMockTemplates(mocks);
  }, [mocks, setMockTemplates]);

  return (
    <section className='deck-wrapper-container h-100vh overflow-x-scroll'>
      <h1 style={{ fontSize: "var(--step-2)" }}>Mock Templates</h1>
      <p>Craft your personalized mock interview templates!</p>

      <div className='flex justify-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className='w-[250px] rounded-md m-auto text-center place-self-center bg-[#642eff] px-0 py-2 hover:bg-black text-white transition-colors duration-300 ease-in-out flex items-center justify-center'>
              Filter
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => console.log("Filter applied")}>
              Apply Filter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Mock Template Button */}
        <AddMockTemplateModal />
      </div>

      <ul className='decks-list h-full gap-4'>
        {Object.values(mockTemplates)
          .reverse()
          .map((mock) => (
            <li key={mock.id}>
              <MockLink
                id={mock.id}
                title={mock.title}
                path={`/mocks/${mock.id}`}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default MocksWrapper;
