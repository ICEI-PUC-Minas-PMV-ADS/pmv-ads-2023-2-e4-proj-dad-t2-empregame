import { IVagaCandidato } from "@/interface/IVaga";
import { authToken } from "@/utils/config/authToken";
import { useFetch } from "@/utils/hooks/useFetch";
import { api } from "@/utils/services/api";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
  Button,
  ModalBody,
  Flex,
  Box,
  Text,
  Link,
} from "@chakra-ui/react";

import { useCookies } from "react-cookie";
import ModalChat from "./ModalChat";

const ModalCandidatosInteressados = (props: {
  qtdCandidatosInteressados: number | undefined;
  idVaga: number | undefined;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  api.defaults.headers.common["Authorization"] =
    "Bearer " + cookies[authToken.nome];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: candidatosInteressados, refetch: refetchList } = useFetch<
    IVagaCandidato[]
  >("/vagas/match/" + props.idVaga);

  return (
    <>
      <Button
        onClick={onOpen}
        gap={"10px"}
        color={"white"}
        fontSize={"18px"}
        fontWeight={"semibold"}
        bg={"#6D3BBF"}
        borderColor={"#6D3BBF"}
        borderWidth={"2px"}
        rounded={"full"}
        textAlign={"center"}
        py={"10px"}
        px={"25px"}
        w={"full"}
        _hover={{
          bg: "#5A2DA4",
          transition: "ease-in",
          boxShadow: "lg",
          color: "white",
          borderColor: "#5A2DA4",
        }}
      >
        <IconCoracao fill={"#FF5757"} borderColor={"#6D3BBF"} />
        {props.qtdCandidatosInteressados} Candidatos Interessados
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} gap={"15px"} color={"#5A2DA4"}>
            <Image src={"../../icons/icon-coracao.svg"} alt="icone coracao" />
            Candidatos Interessados
          </ModalHeader>
          <ModalBody pb={"20px"}>
            <Flex direction={"column"} gap={"10px"}>
              {candidatosInteressados?.map((candidato) => {
                return (
                  <Flex
                    key={candidato.id}
                    borderRadius={"10px"}
                    bg={"#F6F0FF"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    py={"10px"}
                    px={"18px"}
                  >
                    <Box gap={"5px"}>
                      <Text
                        color={"#2E2E2E"}
                        fontWeight={"bold"}
                        fontSize={"18px"}
                      >
                        {candidato.usuario?.nome}
                      </Text>
                      <Link
                        gap={"10px"}
                        alignItems={"center"}
                        display={"flex"}
                        href={"/perfil?id=" + candidato.id_usuario}
                        target="_blank"
                      >
                        <Text
                          color={"regular"}
                          fontWeight={"bold"}
                          fontSize={"14px"}
                        >
                          Ver Perfil
                        </Text>
                        <Image
                          src={"../../icons/icon-ver-perfil.svg"}
                          alt={"ver perfil"}
                        />
                      </Link>
                    </Box>
                    <Flex gap={"10px"}>
                      {candidato.match === true && (
                        <ModalChat match={candidato} />
                      )}

                      <Button
                        onClick={() => {
                          if (candidato.match === false) {
                            api
                              .patch("/vagas/match/" + candidato.id, {
                                match: true,
                              })
                              .then(() => {
                                refetchList();
                              });
                          } else {
                            api
                              .patch("/vagas/match/" + candidato.id, {
                                match: false,
                              })
                              .then(() => {
                                refetchList();
                              });
                          }
                        }}
                        gap={"10px"}
                        color={candidato.match === true ? "white" : "#5A2DA4"}
                        fontSize={"18px"}
                        fontWeight={"semibold"}
                        bg={candidato.match === true ? "#5A2DA4" : "white"}
                        borderColor={"#5A2DA4"}
                        borderWidth={"2px"}
                        rounded={"full"}
                        textAlign={"center"}
                        py={"10px"}
                        px={"25px"}
                        w={"full"}
                        _hover={{
                          bg: "#5A2DA4",
                          transition: "ease-in",
                          boxShadow: "lg",
                          color: "white",
                          borderColor: "#5A2DA4",
                        }}
                      >
                        Interessei
                        <IconInteressei />
                      </Button>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCandidatosInteressados;

const IconCoracao = (props: { fill: string; borderColor: string }) => {
  return (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.625 4.70125L12.5 6.28202L13.3749 4.70125C13.835 3.86987 14.5064 3.17464 15.3212 2.68576C16.1276 2.20192 17.0462 1.93715 17.9861 1.91741C19.5062 1.99121 20.9368 2.65961 21.969 3.77907C23.0078 4.90579 23.5585 6.39785 23.5007 7.92929L23.5 7.94813V7.96699C23.5 9.9114 22.4628 12.0721 20.8095 14.2438C19.1743 16.3917 17.0363 18.4208 15.0573 20.0808L15.0566 20.0814C14.3406 20.6831 13.4353 21.013 12.5 21.013C11.5647 21.013 10.6593 20.6831 9.9433 20.0814L9.94262 20.0808C7.96364 18.4208 5.82559 16.3917 4.19038 14.2438C2.53714 12.0721 1.49996 9.9114 1.49996 7.96699V7.94813L1.49925 7.92929C1.44146 6.39785 1.99213 4.90579 3.03094 3.77907C4.06308 2.65961 5.49374 1.99121 7.01382 1.91741C7.95368 1.93715 8.8723 2.20192 9.6787 2.68576C10.4935 3.17464 11.1649 3.86987 11.625 4.70125Z"
        stroke={props.borderColor}
        strokeWidth="2"
        fill={props.fill}
      />
    </svg>
  );
};

const IconInteressei = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      style={{ minWidth: "18px" }}
    >
      <g clipPath="url(#clip0_38_2258)">
        <path
          d="M9.042 8.40807L15.0713 13.4466L10.8008 16.6498C9.73425 17.4501 8.26725 17.4501 7.20075 16.6498L2.601 13.1998C2.21175 12.9081 1.73775 12.7498 1.251 12.7498H0.75075C0.336 12.7498 0 12.4138 0 11.9998V3.70257C0 3.32157 0.28425 3.00432 0.663 2.96157C1.68075 2.84832 2.59725 2.43957 3.53475 1.89357C4.88325 1.19982 6.6525 1.44732 7.74675 2.47257L8.2095 2.91732L5.20425 5.85057C4.3995 6.65457 4.27125 7.92582 4.90575 8.80407C5.29575 9.34632 6.0015 9.74832 6.73875 9.74832C7.3335 9.74832 7.90425 9.51432 8.31675 9.10107L9.042 8.40732V8.40807ZM14.9655 1.89357C13.698 1.25982 12.117 1.42482 10.9845 2.30457L6.25725 6.91857C5.979 7.19757 5.916 7.64382 6.1215 7.92881C6.2565 8.11631 6.45225 8.22882 6.67575 8.24757C6.897 8.26632 7.1115 8.18607 7.26675 8.03007L9.98025 5.45832C10.692 4.78257 11.7233 5.86106 11.0175 6.54207L10.1318 7.36482L16.5765 12.7506H17.2493C17.6633 12.7506 17.9993 12.4146 17.9993 12.0006V3.67707C17.9993 3.30957 17.7308 3.00582 17.3685 2.94057C16.098 2.71107 14.9648 1.89432 14.9648 1.89432L14.9655 1.89357Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_38_2258">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
