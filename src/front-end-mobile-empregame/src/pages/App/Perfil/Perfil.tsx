import {
  Box,
  Button,
  Divider,
  HStack,
  Link,
  Menu,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from "native-base";
import { useAuth } from "../../../context/auth";
import { useFetch } from "../../../utils/hooks/useFetch";
import { LinearGradient } from "expo-linear-gradient";
import { IUsuario } from "../../../interface/IUsuario";
import {
  IconHamburguer,
  IconLink,
  IconStar,
  IconVoltar,
} from "../../../components/icons";
import { EditarSenha } from "./EditarSenha";
import { EditarPerfil } from "./EditarPerfil";
import { ExcluirConta } from "./ExcluirConta";

export const Perfil = ({ route, navigation }: any) => {
  const { user } = useAuth();
  const idusuario = route.params.idusuario;

  const { data: usuario, refetch } = useFetch<IUsuario>(
    "/usuarios/" + idusuario,
    {
      method: "GET",
    }
  );

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
      <ScrollView>
        <View px={"30px"} py={"40px"}>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
          >
            <Button
              marginY={"20px"}
              alignSelf={"flex-start"}
              bg={"none"}
              rounded={"full"}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <HStack space={"10px"} alignItems={"center"}>
                <IconVoltar />
                <Text fontFamily={"Outfit-500"} color={"white"}>
                  Voltar
                </Text>
              </HStack>
            </Button>
            {user?.id === usuario?.id && (
              <Menu
                alignSelf={"flex-end"}
                placement="bottom left"
                w="250px"
                marginRight={3}
                background={"#6D3BBF"}
                trigger={(triggerProps) => {
                  return (
                    <Pressable accessibilityLabel="Menu" {...triggerProps}>
                      <IconHamburguer
                        style={{ marginVertical: 15, marginHorizontal: 10 }}
                      />
                    </Pressable>
                  );
                }}
              >
                {usuario && (
                  <Menu.Item>
                    <EditarPerfil
                      usuario={usuario}
                      refetch={() => {
                        refetch();
                      }}
                    />
                  </Menu.Item>
                )}
                <Menu.Item>
                  <EditarSenha />
                </Menu.Item>
                <Menu.Item>
                  <ExcluirConta />
                </Menu.Item>
              </Menu>
            )}
          </HStack>
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
                  <Link href={usuario.github}>
                    <Text
                      fontWeight={"semibold"}
                      display={"flex"}
                      alignItems={"center"}
                      color={"white"}
                      fontSize={"16px"}
                      fontFamily={"Outfit-500"}
                    >
                      {usuario.github.replace("https://", "")} {"  "}
                      <IconLink />
                    </Text>
                  </Link>
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
                  <Link href={usuario.portfolio}>
                    <Text
                      fontWeight={"semibold"}
                      display={"flex"}
                      alignItems={"center"}
                      color={"white"}
                      fontSize={"16px"}
                      fontFamily={"Outfit-500"}
                    >
                      {usuario.portfolio.replace("https://", "")} {"  "}
                      <IconLink />
                    </Text>
                  </Link>
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
                  <Link href={usuario.linkedin}>
                    <Text
                      fontWeight={"semibold"}
                      display={"flex"}
                      alignItems={"center"}
                      color={"white"}
                      fontSize={"16px"}
                      fontFamily={"Outfit-500"}
                    >
                      {usuario.linkedin.replace("https://", "")} {"  "}
                      <IconLink />
                    </Text>
                  </Link>
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
                                <Box key={index}>
                                  <IconStar
                                    fill={
                                      currentRating <=
                                      hardskill.nivel_experiencia
                                        ? "#FFB800"
                                        : "white"
                                    }
                                  />
                                </Box>
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
                                <Box key={index}>
                                  <IconStar
                                    fill={
                                      currentRating <=
                                      softskill.nivel_experiencia
                                        ? "#FFB800"
                                        : "white"
                                    }
                                  />
                                </Box>
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
        </View>
      </ScrollView>
    </>
  );
};
