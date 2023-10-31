import { ButtonPrimary } from "@/components/button-primary";
import { InputForm } from "@/components/input-form";
import { IUsuario, IUsuarioHardSkill } from "@/interface/IUsuario";
import { authToken } from "@/utils/config/authToken";
import { useFetch } from "@/utils/hooks/useFetch";
import { useMutation } from "@/utils/hooks/useMutation";
import { numberToPhone } from "@/utils/regex/numberToPhone";
import { api } from "@/utils/services/api";
import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Image,
  ModalBody,
  SimpleGrid,
  Flex,
  InputGroup,
  InputRightElement,
  Text,
  ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ModalEditarInformacao = (props: {
  usuario: IUsuario;
  refetch: () => void;
}) => {
  const [cookies] = useCookies([authToken.nome]);
  api.defaults.headers.common["Authorization"] =
    "Bearer " + cookies[authToken.nome];
  const userAtual = props.usuario;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nome, setNome] = useState<string>(userAtual.nome);
  const [email, setEmail] = useState<string | undefined | null>(
    userAtual.email
  );
  const [telefone, setTelefone] = useState<string | undefined | null>(
    userAtual.telefone
  );
  const [github, setGithub] = useState<string | undefined | null>(
    userAtual.github
  );
  const [portfolio, setPortfolio] = useState<string | undefined | null>(
    userAtual.portfolio
  );
  const [linkedin, setLinkedin] = useState<string | undefined | null>(
    userAtual.linkedin
  );
  const [hardskill, setHardskill] = useState<string>("");
  const [listHardskill, setListHardskill] = useState<
    {
      id: number;
      nome: string;
      nivel_experiencia: number;
    }[]
  >([]);

  const [softskill, setSoftskill] = useState<string>("");
  const [listSoftskill, setListSoftskill] = useState<
    {
      id: number;
      nome: string;
      nivel_experiencia: number;
    }[]
  >([]);

  const { data: hardskillsAtuais, refetch: refetchHardSkill } = useFetch<
    IUsuarioHardSkill[]
  >("/usuarios/hardskills/" + userAtual.id);

  const adicionarHardskill = (hardskill: {
    nome: string;
    nivel_experiencia: number;
  }) => {
    api
      .post("/hardskills", {
        nome: hardskill.nome,
      })
      .then((data: { data: { id: number } }) => {
        const idHardskill = data.data.id;
        api
          .post("/usuarios/hardskills", {
            nivel_experiencia: hardskill.nivel_experiencia,
            id_usuario: userAtual.id,
            id_hardskill: idHardskill,
          })
          .then(() => refetchHardSkill());
      });
  };

  const adicionarSoftskill = (softskill: {
    id: number;
    nome: string;
    nivel_experiencia: number;
  }) => {
    setListSoftskill((old) => [...old, softskill]);
  };

  const {
    mutate: mutateAtualizarUsuario,
    isFetching: isFetchingAtualizarUsuario,
  } = useMutation<IUsuario>("/usuarios", {
    method: "PATCH",
    onSuccess: () => {
      props.refetch();
      toast({ title: "Dados atualizado com sucesso!", status: "success" });
      onClose();
    },
    onError: (err) => {
      toast({ title: err.message, status: "error" });
    },
  });

  const atualizarDados = () => {
    mutateAtualizarUsuario({
      nome: nome,
      email: email,
      telefone: telefone,
      linkedin: linkedin,
      github: github,
      portfolio: portfolio,
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bg={"none"}
        gap={"10px"}
        color={"white"}
        _hover={{ bg: "#6d3bbf" }}
        rounded={"full"}
      >
        <Image src={"./icons/icon-edit.svg"} alt="icone editar" />
        Editar informações
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} gap={"15px"} color={"#5A2DA4"}>
            <Image src={"./icons/icon-editar.svg"} alt="icone editar" />
            Editar informações
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"15px"} direction={"column"}>
              <SimpleGrid columns={2} spacingY={"16px"} spacingX={"30px"}>
                <InputForm
                  type="text"
                  placeholder="Nome *"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <InputForm
                  type="email"
                  placeholder="E-mail *"
                  value={email ? email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputForm
                  type="tel"
                  placeholder="Telefone"
                  value={telefone ? telefone : ""}
                  onChange={(e) => setTelefone(numberToPhone(e.target.value))}
                />
                {userAtual.tipo === "CANDIDATO" && (
                  <>
                    <InputForm
                      type="text"
                      placeholder="GitHub"
                      value={github ? github : ""}
                      onChange={(e) => setGithub(e.target.value)}
                    />
                    <InputForm
                      type="text"
                      placeholder="Portfólio"
                      value={portfolio ? portfolio : ""}
                      onChange={(e) => setPortfolio(e.target.value)}
                    />
                    <InputForm
                      type="text"
                      placeholder="Linkedin"
                      value={linkedin ? linkedin : ""}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                  </>
                )}
              </SimpleGrid>
              {userAtual.tipo === "CANDIDATO" && (
                <>
                  <Flex direction={"column"} gap={"12px"}>
                    <InputGroup>
                      <InputForm
                        type="text"
                        placeholder="Hardskills"
                        onChange={(e) => setHardskill(e.target.value)}
                      />
                      <InputRightElement w={"25%"}>
                        <Button
                          onClick={() =>
                            adicionarHardskill({
                              nome: hardskill,
                              nivel_experiencia: 1,
                            })
                          }
                          bg={"none"}
                          rounded={"full"}
                          h={"30px"}
                          color={"#2E2E2E"}
                        >
                          <Image
                            src="./icons/icon-mais.svg"
                            pr={"10px"}
                            alt="icone mais"
                          />
                          Adicionar
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <SimpleGrid columns={2} gap={"15px"}>
                      {hardskillsAtuais &&
                        hardskillsAtuais.map((hardskill) => {
                          return (
                            <Flex
                              direction={"column"}
                              bg={"#6D3BBF"}
                              rounded={"12px"}
                              py={"12px"}
                              px={"20px"}
                              key={hardskill.id}
                            >
                              <Flex justifyContent={"space-between"}>
                                <Text
                                  fontSize={"16px"}
                                  fontWeight={"medium"}
                                  color={"white"}
                                >
                                  {hardskill.hardskill.nome}
                                </Text>
                                <Button
                                  bg={"none"}
                                  _hover={{ bg: "#5A2DA4" }}
                                  position={"relative"}
                                  top={"-8px"}
                                  right={"-15px"}
                                  rounded={"full"}
                                  maxW={"10px"}
                                  onClick={() => {
                                    api
                                      .delete(
                                        "/usuarios/hardskills/" + hardskill.id
                                      )
                                      .then(() => refetchHardSkill());
                                  }}
                                >
                                  <Image
                                    src="/icons/icon-close.svg"
                                    minH={"10px"}
                                    minW={"10px"}
                                    alt="icone fechar"
                                  />
                                </Button>
                              </Flex>
                              <Flex gap={"8px"}>
                                {[...Array(5)].map((star, index) => {
                                  const currentRating = index + 1;

                                  return (
                                    <label key={Math.random() * index}>
                                      <input
                                        type="radio"
                                        name="rating"
                                        value={hardskill.nivel_experiencia}
                                        onClick={() => {
                                          api
                                            .patch(
                                              "/usuarios/hardskills/" +
                                                hardskill.id,
                                              {
                                                nivel_experiencia:
                                                  currentRating,
                                              }
                                            )
                                            .then(() => refetchHardSkill());
                                        }}
                                        style={{
                                          display: "none",
                                          cursor: "pointer",
                                        }}
                                      />
                                      <IconStar
                                        fill={
                                          currentRating <=
                                          hardskill.nivel_experiencia
                                            ? "#FFB800"
                                            : "white"
                                        }
                                      />
                                    </label>
                                  );
                                })}
                              </Flex>
                            </Flex>
                          );
                        })}
                    </SimpleGrid>
                  </Flex>
                  <Flex direction={"column"} gap={"12px"}>
                    <InputGroup>
                      <InputForm
                        type="text"
                        placeholder="Softskills"
                        onChange={(e) => setSoftskill(e.target.value)}
                      />
                      <InputRightElement w={"25%"}>
                        <Button
                          onClick={() =>
                            adicionarSoftskill({
                              id: Math.random() * 100,
                              nome: softskill,
                              nivel_experiencia: 1,
                            })
                          }
                          bg={"none"}
                          rounded={"full"}
                          h={"30px"}
                          color={"#2E2E2E"}
                        >
                          <Image
                            src="./icons/icon-mais.svg"
                            pr={"10px"}
                            alt="icone mais"
                          />
                          Adicionar
                        </Button>
                      </InputRightElement>
                    </InputGroup>

                    <SimpleGrid columns={2} gap={"15px"}>
                      {listSoftskill.map((softskill) => {
                        const softskillIndex = listSoftskill.findIndex(
                          (e) => e.id === softskill.id
                        );
                        return (
                          <Flex
                            direction={"column"}
                            bg={"#6D3BBF"}
                            rounded={"12px"}
                            py={"12px"}
                            px={"20px"}
                            key={softskill.id}
                          >
                            <Flex justifyContent={"space-between"}>
                              <Text
                                fontSize={"16px"}
                                fontWeight={"medium"}
                                color={"white"}
                              >
                                {softskill.nome}
                              </Text>
                              <Button
                                bg={"none"}
                                _hover={{ bg: "#5A2DA4" }}
                                position={"relative"}
                                top={"-8px"}
                                right={"-15px"}
                                rounded={"full"}
                                maxW={"10px"}
                                onClick={() =>
                                  setListSoftskill(
                                    listSoftskill.filter(
                                      (e) => e.id !== softskill.id
                                    )
                                  )
                                }
                              >
                                <Image
                                  alt="icone fechar"
                                  src="/icons/icon-close.svg"
                                  minH={"10px"}
                                  minW={"10px"}
                                />
                              </Button>
                            </Flex>
                            <Flex gap={"8px"}>
                              {[...Array(5)].map((star, index) => {
                                const currentRating = index + 1;
                                return (
                                  <label key={Math.random() * index}>
                                    <input
                                      type="radio"
                                      name="rating"
                                      value={softskill.nivel_experiencia}
                                      onClick={() => {
                                        const tempSoftskills = [
                                          ...listSoftskill,
                                        ];

                                        tempSoftskills[
                                          softskillIndex
                                        ].nivel_experiencia = currentRating;

                                        setListSoftskill(tempSoftskills);
                                      }}
                                      style={{
                                        display: "none",
                                        cursor: "pointer",
                                      }}
                                    />
                                    <IconStar
                                      fill={
                                        currentRating <=
                                        listSoftskill[softskillIndex]
                                          .nivel_experiencia
                                          ? "#FFB800"
                                          : "white"
                                      }
                                    />
                                  </label>
                                );
                              })}
                            </Flex>
                          </Flex>
                        );
                      })}
                    </SimpleGrid>
                  </Flex>
                </>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <ButtonPrimary
              onClick={() => atualizarDados()}
              buttonText="Salvar"
              loadingText="Salvando"
              isLoading={isFetchingAtualizarUsuario}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditarInformacao;

const IconStar = (props: { fill: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{ cursor: "pointer" }}
    >
      <g clipPath="url(#clip0_27_3091)">
        <path
          d="M0.884551 8.26672L3.25788 10.0001L2.35655 12.7914C2.21089 13.2243 2.20905 13.6927 2.35129 14.1268C2.49353 14.5608 2.77225 14.9373 3.14588 15.2001C3.51312 15.4712 3.95815 15.6165 4.41465 15.6142C4.87116 15.6119 5.31471 15.4622 5.67922 15.1874L7.99988 13.4794L10.3212 15.1854C10.6878 15.455 11.1304 15.6015 11.5855 15.6037C12.0405 15.6059 12.4845 15.4638 12.8537 15.1977C13.2229 14.9317 13.4982 14.5554 13.6401 14.123C13.7819 13.6907 13.783 13.2244 13.6432 12.7914L12.7419 10.0001L15.1152 8.26672C15.4813 7.99906 15.7535 7.62255 15.8928 7.19098C16.0321 6.7594 16.0315 6.29484 15.891 5.86364C15.7505 5.43244 15.4774 5.05667 15.1106 4.78999C14.7438 4.52331 14.3021 4.37936 13.8486 4.37872H10.9332L10.0486 1.62138C9.90943 1.18736 9.63606 0.808727 9.26786 0.540094C8.89966 0.271462 8.45566 0.126709 7.99988 0.126709C7.54411 0.126709 7.1001 0.271462 6.7319 0.540094C6.36371 0.808727 6.09034 1.18736 5.95122 1.62138L5.06655 4.37872H2.15388C1.70038 4.37936 1.25868 4.52331 0.891871 4.78999C0.525063 5.05667 0.251912 5.43244 0.111432 5.86364C-0.0290475 6.29484 -0.0296693 6.7594 0.109656 7.19098C0.24898 7.62255 0.521125 7.99906 0.887218 8.26672H0.884551Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_27_3091">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
