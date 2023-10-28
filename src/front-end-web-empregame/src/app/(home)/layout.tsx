"use client";

import { Footer } from "./Footer";
import { Header } from "./Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
