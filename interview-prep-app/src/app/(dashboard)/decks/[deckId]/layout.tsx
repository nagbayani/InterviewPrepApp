import React from "react";
import { ModalProvider } from "@/containers/modal/ModalContext";

const DeckLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return (
    <section>
      <ModalProvider>
        {children}
        {modal}
      </ModalProvider>
    </section>
  );
};

export default DeckLayout;
