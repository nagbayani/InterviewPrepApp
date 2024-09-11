"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useDialog } from "./useDialog";
import Card from "@/app/(dashboard)/decks/[deckId]/c/[cardId]/page";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CardData } from "@/types/data-types";

import { useModal } from "./ModalContext";

/**
 * Modal Component that will open the card in a modal
 * Content = Card-Display.tsx
 *
 *
 */
export function Modal({
  children,
  data,
  loading,
}: {
  children: React.ReactNode;
  data: CardData;
  loading?: boolean; // A flag to indicate whether data is still loading
}) {
  const { open, closeModal, openModal } = useModal();
  const router = useRouter();

  // Possible Security Risk -- if hacker saves malicious code in the answer field to execute in database
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      openModal(data.id, data.deckId);
      router.push(`/decks/${data.deckId}/c/${data.id}`);
    } else if (!isOpen) {
      // need to update [deckId] page content dynamically and not just refresh -- state management?
      closeModal();
      router.back();
    }
  };

  /* When backing out:
   *
   ** link should be === http://localhost:3000/decks/clwbh5qrm0000u7wkkkmzm6gz **
   *
   */
  return (
    <>
      <Drawer open={open} onOpenChange={handleOpenChange} dismissible={false}>
        <DrawerContent>
          {loading ? (
            <div className='text-center'>Loading...</div> // Show loading state
          ) : (
            children // Show actual content when data is loaded
          )}
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
