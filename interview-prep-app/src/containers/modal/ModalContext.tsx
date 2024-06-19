"use client";

// modalContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  open: boolean;
  openModal: (cardId: string, deckId: string) => void;
  closeModal: () => void;
  cardId: string | null;
  deckId: string | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [cardId, setCardId] = useState<string | null>(null);
  const [deckId, setDeckId] = useState<string | null>(null);

  const openModal = (cardId: string, deckId: string) => {
    setCardId(cardId);
    setDeckId(deckId);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setCardId(null);
    setDeckId(null);
  };

  return (
    <ModalContext.Provider
      value={{ open, openModal, closeModal, cardId, deckId }}
    >
      {children}
    </ModalContext.Provider>
  );
};
