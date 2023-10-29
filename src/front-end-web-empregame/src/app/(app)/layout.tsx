"use client";

import { authToken } from "@/utils/config/authToken";
import { useAppContext } from "@/utils/hooks/useContext";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { parseJwt } from "@/utils/functions/parseJwt";
import { useMutation } from "@/utils/hooks/useMutation";
import { IUsuario } from "@/interface/IUsuario";
import { useToast } from "@chakra-ui/react";
import { useFetch } from "@/utils/hooks/useFetch";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const toast = useToast();
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
        id: number;
      };
      useFetch<IUsuario>("/usuarios/" + payloadJWT.id, {
        method: "GET",
        onSuccess: (data) => {
          dispatchAppContext({
            payload: {
              nome: data.data.nome,
              id: data.data.id,
              email: data.data.email,
              tipo: data.data.tipo,
            },
            type: "SET_USUARIO",
          });
        },
        onError: (err) => {
          if (err.response?.data)
            toast({ title: err.response.data.message, status: "error" });
        },
      });
    }
  }, [usuario, router, cookie]);

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
