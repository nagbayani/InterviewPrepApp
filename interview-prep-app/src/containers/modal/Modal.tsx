"use client";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTrigger,
  DialogPortal,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useDialog } from "./useDialog";
import Card from "@/app/(dashboard)/decks/[deckId]/c/[cardId]/page";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { CardData } from "@/types/CardData";

import { useModal } from "./ModalContext";

export function Modal({
  children,
  data,
}: {
  children: React.ReactNode;
  data: CardData;
}) {
  // const { open, closeModal, cardId, deckId } = useModal();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (open) {
      router.push(`/decks/${data.deckId}/c/${data.id}`);
    } else if (!open) {
      // router.push(`/decks/${data.deckId}`);
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
      {/* <Dialog
        defaultOpen={true}
        modal
        open={isOpen}
        onOpenChange={handleOpenChange}
      > */}
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant='outline'>{data.question}</Button>
        </DialogTrigger>
        <DialogOverlay>
          <DialogContent className='lg:max-w-screen-lg overflow-y-scroll max-h-screen'>
            {children}
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </>
  );
}
