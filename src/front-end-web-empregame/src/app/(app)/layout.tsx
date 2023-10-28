"use client";

import { authToken } from "@/utils/config/authToken";
import { useAppContext } from "@/utils/hooks/useContext";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { parseJwt } from "@/utils/functions/parseJwt";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  /*   const router = useRouter();
  const [cookie] = useCookies([authToken.nome]);
  const {
    state: { usuario },
    dispatch: dispatchAppContext,
  } = useAppContext();

  useEffect(() => {
    if (!usuario && !cookie[authToken.nome]) {
      router.push("/login");
    }
    if (!usuario?.id && cookie[authToken.nome]) {
      const payloadJWT = parseJwt(cookie[authToken.nome]) as {
        email: string;
        nome: string;
        id: number;
        tipo: "RECRUTADOR" | "CANDIDATO";
      };
      dispatchAppContext({
        payload: {
          nome: payloadJWT.nome,
          email: payloadJWT.email,
          id: payloadJWT.id,
          tipo: payloadJWT.tipo,
        },
        type: "SET_USUARIO",
      });
    }
  }, [usuario, router, cookie]); */

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
