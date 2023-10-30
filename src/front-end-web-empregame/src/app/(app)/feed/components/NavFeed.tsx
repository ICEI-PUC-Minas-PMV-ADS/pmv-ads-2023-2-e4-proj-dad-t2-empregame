import { ButtonNavigation } from "@/components/button-navigation";
import { useAppContext } from "@/utils/hooks/useContext";
import { Flex } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

const NavFeed = () => {
  const pathAtual = usePathname();
  const router = useRouter();
  const {
    state: { usuario },
  } = useAppContext();

  return (
    <Flex direction={"column"} width={"20%"} gap={"18px"}>
      <ButtonNavigation
        buttonText={"Feed"}
        onClick={() => router.push("/feed")}
        color={pathAtual === "/feed" ? "white" : "#5A2DA4"}
        bg={pathAtual === "/feed" ? "#5A2DA4" : "white"}
        borderColor={pathAtual === "/feed" ? "none" : "#5A2DA4"}
        borderWidth={pathAtual === "/feed" ? "none" : "1px"}
      />
      {usuario?.tipo === "CANDIDATO" && (
        <ButtonNavigation
          buttonText={"Vagas que Interessei"}
          onClick={() => router.push("/feed/vagas-interessei")}
          color={pathAtual === "/feed/vagas-interessei" ? "white" : "#5A2DA4"}
          bg={pathAtual === "/feed/vagas-interessei" ? "#5A2DA4" : "white"}
          borderColor={
            pathAtual === "/feed/vagas-interessei" ? "none" : "#5A2DA4"
          }
          borderWidth={pathAtual === "/feed/vagas-interessei" ? "none" : "1px"}
        />
      )}
      {usuario?.tipo === "RECRUTADOR" && (
        <>
          <ButtonNavigation
            buttonText={"Minhas vagas"}
            onClick={() => router.push("/feed/minhas-vagas")}
            color={pathAtual === "/feed/minhas-vagas" ? "white" : "#5A2DA4"}
            bg={pathAtual === "/feed/minhas-vagas" ? "#5A2DA4" : "white"}
            borderColor={
              pathAtual === "/feed/minhas-vagas" ? "none" : "#5A2DA4"
            }
            borderWidth={pathAtual === "/feed/minhas-vagas" ? "none" : "1px"}
          />
          <ButtonNavigation
            buttonText={"Buscar por candidato"}
            onClick={() => router.push("/feed/buscar-candidato")}
            color={pathAtual === "/feed/buscar-candidato" ? "white" : "#5A2DA4"}
            bg={pathAtual === "/feed/buscar-candidato" ? "#5A2DA4" : "white"}
            borderColor={
              pathAtual === "/feed/buscar-candidato" ? "none" : "#5A2DA4"
            }
            borderWidth={
              pathAtual === "/feed/buscar-candidato" ? "none" : "1px"
            }
          />
        </>
      )}
    </Flex>
  );
};

export default NavFeed;
