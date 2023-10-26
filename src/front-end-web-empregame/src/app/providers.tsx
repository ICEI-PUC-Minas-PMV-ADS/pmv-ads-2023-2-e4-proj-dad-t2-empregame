"use client";

import { AppContextProvider } from "@/context/appContext";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { CookiesProvider } from "react-cookie";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <AppContextProvider>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </AppContextProvider>
    </CookiesProvider>
  );
}
