"use client";

import { authToken } from "@/utils/config/authToken";
import { useAppContext } from "@/utils/hooks/useContext";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IUsuario } from "@/interface/IUsuario";
import { useToast } from "@chakra-ui/react";
import { useFetch } from "@/utils/hooks/useFetch";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const toast = useToast();
  const [cookies, , removeCookie] = useCookies([authToken.nome]);
  const { dispatch: dispatchAppContext } = useAppContext();

  useFetch("/auth/recover/" + cookies[authToken.nome], {
    method: "GET",
    enable: !!cookies[authToken.nome],
    itensRefresh: [cookies[authToken.nome]],
    onSuccess: (data) => {
      const user = data.data as { access_token: string; usuario: IUsuario };
      dispatchAppContext({ payload: user.usuario, type: "SET_USUARIO" });
    },
    onError: () => {
      removeCookie(authToken.nome);
      router.push("/login");
    },
  });

  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
