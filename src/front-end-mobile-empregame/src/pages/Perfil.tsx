import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useAuth } from "../context/auth";
import { useFetch } from "../utils/hooks/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { IUsuario } from "../interface/IUsuario";
import { ClipPath, Defs, G, Path, Svg, SvgProps } from "react-native-svg";

export const Perfil = () => {
  const { user } = useAuth();

  const idusuario = user?.id ? user.id : 1;

  const { data: usuario, refetch } = useFetch<IUsuario>("/usuarios/" + idusuario, {
    method: "GET",
    /*onSuccess: (data) => {
      if (usuarioLogado?.id === data.data.id)
        dispatchAppContext({ payload: data.data, type: "SET_usuario" });
    },*/
  });

  return (
    <>
      <LinearGradient
        // Background Linear Gradient
        colors={["#7345D6", "#DA4FE2"]}
        start={{ x: -0.2, y: 0.5 }}
        end={{ x: 1, y: -0.3 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
        }}
      />
      <ScrollView px={"30px"} py={"40px"}>
        <Button
          marginY={"20px"}
          alignSelf={"start"}
          fontFamily={"Outfit-500"}
          bg={"none"}
          color={"white"}
          rounded={"full"}
          onPress={() => {}}
        >
          <HStack space={"10px"} alignItems={"center"}>
            <IconVoltar />
            Voltar
          </HStack>
        </Button>
        {/*{usuarioLogado?.id === usuario?.id && (
      <VStack space={"40px"}>
        {usuario && (
          <ModalEditarInformacao
            usuario={usuario}
            refetch={() => {
              refetch();
            }}
          />
        )}
        {usuario && <ModalAlterarSenha />}
        {usuario && <DialogExcluirConta />}
      </VStack>
    )}*/}

        <VStack direction={"column"} space={"32px"} width={"100%"}>
          <VStack space={"15px"} direction={"column"}>
            <Text
              fontFamily={"Outfit-500"}
              color={"white"}
              fontWeight={"semibold"}
              fontSize={"36px"}
            >
              {usuario?.nome}
            </Text>
            <Box
              bg={"#5a2da4"}
              padding={"8px 25px"}
              rounded={"full"}
              maxWidth={"200px"}
            >
              <Text
                color={"white"}
                textAlign={"center"}
                fontSize={"16px"}
                fontWeight={"semibold"}
                fontFamily={"Outfit-500"}
              >
                {usuario?.tipo}
              </Text>
            </Box>
          </VStack>
          <Divider />
          <VStack space={"20px"}>
            {usuario?.telefone && (
              <Box>
                <Text
                  color={"white"}
                  fontSize={"16px"}
                  fontFamily={"Outfit-500"}
                  fontWeight={"normal"}
                >
                  Telefone
                </Text>
                <Text
                  color={"white"}
                  fontSize={"16px"}
                  fontFamily={"Outfit-500"}
                  fontWeight={"semibold"}
                >
                  {usuario.telefone}
                </Text>
              </Box>
            )}
            {usuario?.email && (
              <Box color={"white"} fontSize={"16px"}>
                <Text
                  color={"white"}
                  fontSize={"16px"}
                  fontFamily={"Outfit-500"}
                  fontWeight={"normal"}
                >
                  E-mail
                </Text>
                <Text
                  color={"white"}
                  fontSize={"16px"}
                  fontFamily={"Outfit-500"}
                  fontWeight={"semibold"}
                >
                  {usuario.email}
                </Text>
              </Box>
            )}
            {usuario?.github && (
              <Box color={"white"} fontSize={"16px"}>
                <Text
                  color={"white"}
                  fontSize={"16px"}
                  fontFamily={"Outfit-500"}
                  fontWeight={"normal"}
                >
                  GitHub
                </Text>
                <a href={usuario.github} target="_blank">
                  <Text
                    fontWeight={"semibold"}
                    display={"flex"}
                    alignItems={"center"}
                    color={"white"}
                    fontSize={"16px"}
                    fontFamily={"Outfit-500"}
                  >
                    {usuario.github.replace("https://", "")}
                    <IconLink style={{ paddingLeft: "10px" }} />
                  </Text>
                </a>
              </Box>
            )}
            {usuario?.portfolio && (
              <Box color={"white"} fontSize={"16px"}>
                <Text
                  color={"white"}
                  fontSize={"16px"}
                  fontFamily={"Outfit-500"}
                  fontWeight={"normal"}
                >
                  Portifólio
                </Text>
                <a href={usuario.portfolio} target="_blank">
                  <Text
                    fontWeight={"semibold"}
                    display={"flex"}
                    alignItems={"center"}
                    color={"white"}
                    fontSize={"16px"}
                    fontFamily={"Outfit-500"}
                  >
                    {usuario.portfolio.replace("https://", "")}
                    <IconLink style={{ paddingLeft: "10px" }} />
                  </Text>
                </a>
              </Box>
            )}
            {usuario?.linkedin && (
              <Box color={"white"} fontSize={"16px"}>
                <Text
                  color={"white"}
                  fontSize={"16px"}
                  fontFamily={"Outfit-500"}
                  fontWeight={"normal"}
                >
                  Linkedin
                </Text>
                <a href={usuario.linkedin} target="_blank">
                  <Text
                    fontWeight={"semibold"}
                    display={"flex"}
                    alignItems={"center"}
                    color={"white"}
                    fontSize={"16px"}
                    fontFamily={"Outfit-500"}
                  >
                    {usuario.linkedin.replace("https://", "")}
                    <IconLink style={{ paddingLeft: "10px" }} />
                  </Text>
                </a>
              </Box>
            )}
          </VStack>
          {usuario?.tipo === "CANDIDATO" && (
            <>
              <Divider />
              <VStack space={"45px"}>
                <Box width={"full"}>
                  <Text
                    color={"white"}
                    fontSize={"16px"}
                    fontFamily={"Outfit-500"}
                    paddingBottom={"5px"}
                  >
                    Hardskills
                  </Text>

                  <VStack space={"12px"}>
                    {usuario?.usuario_hardskill?.map((hardskill) => (
                      <VStack
                        key={hardskill.id + hardskill.hardskill.nome}
                        direction={"column"}
                        bg={"#6D3BBF"}
                        rounded={"12px"}
                        py={"12px"}
                        px={"20px"}
                        width={"full"}
                        space={"8px"}
                      >
                        <Text
                          fontSize={"16px"}
                          fontWeight={"medium"}
                          color={"white"}
                          fontFamily={"Outfit-500"}
                        >
                          {hardskill.hardskill.nome}
                        </Text>

                        <HStack space={"8px"}>
                          {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            return (
                              <label key={index}>
                                <IconStar
                                  fill={
                                    currentRating <= hardskill.nivel_experiencia
                                      ? "#FFB800"
                                      : "white"
                                  }
                                />
                              </label>
                            );
                          })}
                        </HStack>
                      </VStack>
                    ))}
                  </VStack>
                </Box>

                <Box width={"full"}>
                  <Text
                    fontFamily={"Outfit-500"}
                    color={"white"}
                    fontSize={"16px"}
                    paddingBottom={"5px"}
                  >
                    Softskills
                  </Text>
                  <VStack space={"12px"}>
                    {usuario?.usuario_softskill?.map((softskill) => (
                      <VStack
                        key={softskill.id + softskill.softskill.nome}
                        direction={"column"}
                        bg={"#6D3BBF"}
                        rounded={"12px"}
                        py={"12px"}
                        px={"20px"}
                        width={"full"}
                        space={"8px"}
                      >
                        <Text
                          fontSize={"16px"}
                          fontWeight={"medium"}
                          color={"white"}
                          fontFamily={"Outfit-500"}
                        >
                          {softskill.softskill.nome}
                        </Text>

                        <HStack space={"8px"}>
                          {[...Array(5)].map((star, index) => {
                            const currentRating = index + 1;
                            return (
                              // eslint-disable-next-line react/jsx-key
                              <label key={index}>
                                <IconStar
                                  fill={
                                    currentRating <= softskill.nivel_experiencia
                                      ? "#FFB800"
                                      : "white"
                                  }
                                />
                              </label>
                            );
                          })}
                        </HStack>
                      </VStack>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            </>
          )}
        </VStack>
      </ScrollView>
    </>
  );
};

const IconVoltar = (props: SvgProps) => (
  <Svg width={21} height={21} fill="none" {...props}>
    <Path
      fill="#2E2E2E"
      d="M15.681 1.317c0 .348-.139.682-.385.927L8.583 8.957a2.188 2.188 0 0 0 0 3.095l6.704 6.704a1.312 1.312 0 0 1-1.856 1.856l-6.704-6.7a4.818 4.818 0 0 1 0-6.806L13.44.389a1.312 1.312 0 0 1 2.241.928Z"
    />
  </Svg>
);

const IconLink = (props: SvgProps) => (
  <Svg width={16} height={18} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#492387"
        d="M12 13.604c0 2.146-1.647 3.896-3.667 3.896H3.667C1.647 17.5 0 15.75 0 13.604V8.646C0 6.5 1.647 4.75 3.667 4.75c.553 0 1 .475 1 1.063 0 .587-.447 1.062-1 1.062-.92 0-1.667.793-1.667 1.77v4.96c0 .977.747 1.77 1.667 1.77h4.666c.92 0 1.667-.793 1.667-1.77 0-.589.447-1.063 1-1.063.553 0 1 .474 1 1.062Zm3.333-9.527L12.387.826a.954.954 0 0 0-1.414-.028c-.4.41-.413 1.076-.026 1.501l2.22 2.451H9c-2.02 0-3.667 1.75-3.667 3.896v3.541c0 .588.447 1.063 1 1.063.554 0 1-.475 1-1.063V8.646c0-.978.747-1.771 1.667-1.771h4.167l-2.22 2.45c-.38.426-.374 1.099.026 1.503a.957.957 0 0 0 1.413-.028l2.927-3.23c.914-.964.914-2.544.014-3.493h.006Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 .5h16v17H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

const IconStar = (props: { fill: string }) => (
  <Svg width={16} height={16} fill="none">
    <G clipPath="url(#a)">
      <Path
        fill={props.fill}
        d="M.885 8.267 3.258 10l-.901 2.792a2.119 2.119 0 0 0 .789 2.408 2.118 2.118 0 0 0 2.533-.012L8 13.48l2.322 1.706a2.15 2.15 0 0 0 3.322-2.394L12.742 10l2.373-1.733a2.151 2.151 0 0 0-1.266-3.888h-2.916l-.884-2.757a2.152 2.152 0 0 0-4.098 0l-.884 2.757H2.154A2.151 2.151 0 0 0 .887 8.267H.885Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
