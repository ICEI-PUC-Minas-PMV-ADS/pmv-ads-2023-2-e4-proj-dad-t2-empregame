"use client";

import { Box, Container } from "@chakra-ui/react";
import NavFeed from "./components/NavFeed";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Box bg={"#FBFBFB"}>
        <Container
          maxWidth={"1366px"}
          display={"flex"}
          gap={"50px"}
          justifyContent={"space-between"}
          paddingY={"60px"}
        >
          <NavFeed />
          {children}
        </Container>
      </Box>
    </div>
  );
}
