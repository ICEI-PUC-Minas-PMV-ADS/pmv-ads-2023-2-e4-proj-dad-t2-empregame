"use client";

import { authToken } from "@/utils/config/authToken";
import { useAppContext } from "@/utils/hooks/useContext";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [cookie] = useCookies([authToken.nome]);
  const {
    state: { usuario },
  } = useAppContext();

  useEffect(() => {
    if (!usuario && !cookie[authToken.nome]) {
      router.push("/login");
    }
  }, [usuario, router, cookie]);

  return <div>{children}</div>;
}
