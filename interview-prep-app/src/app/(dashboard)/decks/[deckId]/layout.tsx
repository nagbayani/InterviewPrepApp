import React from "react";

const DeckLayout = ({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) => {
  return (
    <section>
      {children}
      {modal}
    </section>
  );
};

export default DeckLayout;
