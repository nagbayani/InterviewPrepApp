"use client";

import React, { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
}

/**
 * Provider Component, to wrap the entire application with the SessionProvider for authentication
 * @param children - The children components to be wrapped by the Provider
 *
 */
const Provider: FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
