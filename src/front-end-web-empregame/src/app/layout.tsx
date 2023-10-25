import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Providers } from "./providers";
import { Header } from "./Header";
import { Footer } from "./Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmpregaMe",
  description: "Transforme sua paixão por tecnologia em carreira",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={outfit.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
