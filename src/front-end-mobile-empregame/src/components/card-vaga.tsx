import { useState } from "react";
import { useAuth } from "../context/auth";
import { IVaga } from "../interface/IVaga";
import { useMutation } from "../utils/hooks/useMutation";
import {
  Box,
  Button,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import dayjs from "dayjs";
import {
  IconMaleta,
  IconPerson,
  IconCoracao,
  IconMatch,
  IconDesativarVaga,
} from "./icons";
import { GestureResponderEvent } from "react-native";
import { useRoute } from "@react-navigation/native";
import { EditarVaga } from "../pages/App/Feed/MinhasVagas/EditarVaga";
import { Chat } from "../pages/App/Feed/Chat";

const CardVaga = (props: {
  vaga?: IVaga | null;
  refetch: () => void;
  onPressChat: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressUsuario: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressInteressados?:
    | ((event: GestureResponderEvent) => void)
    | null
    | undefined;
}) => {
  const { user } = useAuth();
  const route = useRoute();
  const isMatch = props.vaga?.vaga_candidato?.find(
    (e) => e.id_usuario === user?.id
  );

  const [isLike, setIsLike] = useState<boolean>(isMatch ? true : false);

  const { mutate: mutateTirarLike } = useMutation<void>(
    "/vagas/match/" + isMatch?.id,
    {
      method: "DELETE",
      onSuccess: () => {
        props.refetch();
      },
    }
  );

  const { mutate: mutateAddLike } = useMutation<{
    id_usuario?: number | null;
    id_vaga?: number | null;
  }>("/vagas/match", {
    method: "POST",
    onSuccess: () => {
      props.refetch();
    },
  });

  const { mutate: mutateAtualizarSituacaoVaga } = useMutation<{
    situacao: IVaga["situacao"];
  }>("/vagas/" + props.vaga?.id, {
    method: "PATCH",
    onSuccess: () => {
      props.refetch();
    },
  });

  return (
    <VStack
      direction={"column"}
      py={"20px"}
      px={"25px"}
      space={"25px"}
      borderWidth={"1px"}
      borderColor={"#E1E1E1"}
      rounded={"13px"}
      bg={"white"}
      width={"100%"}
    >
      <HStack space={"15px"} alignItems={"center"}>
        <IconMaleta />
        <Text
          fontFamily={"Outfit-500"}
          fontSize={"20px"}
          fontWeight={"bold"}
          color={"#2E2E2E"}
          pr={"35px"}
        >
          {props.vaga?.nome}
        </Text>
      </HStack>

      <HStack space={"8px"} flexWrap={"wrap"}>
        {props.vaga?.vaga_hardskill?.map((hardskill) => (
          <Box
            key={hardskill.id}
            bg={"#5A2DA4"}
            py={"5px"}
            px={"10px"}
            rounded={"full"}
            mb={"10px"}
          >
            <Text
              fontSize={"14px"}
              color={"white"}
              fontWeight={"medium"}
              textAlign={"center"}
            >
              {hardskill?.hardskill?.nome}
            </Text>
          </Box>
        ))}
        {props.vaga?.vaga_softskill?.map((softskill) => (
          <Box
            key={softskill.id}
            bg={"#5A2DA4"}
            py={"5px"}
            px={"10px"}
            rounded={"full"}
            mb={"10px"}
          >
            <Text
              fontSize={"14px"}
              color={"white"}
              fontWeight={"medium"}
              textAlign={"center"}
            >
              {softskill?.softskill?.nome}
            </Text>
          </Box>
        ))}
      </HStack>
      <VStack space={"15px"}>
        <VStack space={"15px"} direction={"column"}>
          <VStack space={"5px"} direction={"column"}>
            <Text
              fontFamily={"Outfit-500"}
              fontSize={"14px"}
              color={"#2E2E2E"}
              fontWeight={"semibold"}
            >
              Descrição
            </Text>
            <Text
              fontFamily={"Outfit-500"}
              fontSize={"14px"}
              color={"#2E2E2E"}
              fontWeight={"normal"}
            >
              {props.vaga?.descricao}
            </Text>
          </VStack>
          <VStack space={"5px"} direction={"column"}>
            <Text
              fontFamily={"Outfit-500"}
              fontSize={"14px"}
              color={"#2E2E2E"}
              fontWeight={"semibold"}
            >
              Benefícios
            </Text>
            <Text
              fontFamily={"Outfit-500"}
              fontSize={"14px"}
              color={"#2E2E2E"}
              fontWeight={"normal"}
            >
              {props.vaga?.beneficios}
            </Text>
          </VStack>
          <HStack space={"7px"} flexDirection={"row"} alignItems={"center"}>
            <IconPerson />
            <Text
              fontFamily={"Outfit-500"}
              fontSize={"14px"}
              color={"#2E2E2E"}
              fontWeight={"normal"}
            >
              {props.vaga?.vaga_candidato?.length} pessoas interessadas
            </Text>
          </HStack>
        </VStack>
        <Divider orientation={"horizontal"} h={"1px"} bg={"#E1E1E1"} />
        <HStack space={"50px"}>
          <VStack space={"10px"} direction={"column"}>
            <VStack space={"2px"} direction={"column"}>
              <Text
                fontFamily={"Outfit-500"}
                fontSize={"14px"}
                color={"#2E2E2E"}
                fontWeight={"semibold"}
              >
                Empresa
              </Text>
              <Text
                fontFamily={"Outfit-500"}
                fontSize={"14px"}
                color={"#2E2E2E"}
                fontWeight={"normal"}
              >
                {props.vaga?.empresa_nome}
              </Text>
            </VStack>
            <VStack space={"2px"} direction={"column"}>
              <Text
                fontFamily={"Outfit-500"}
                fontSize={"14px"}
                color={"#2E2E2E"}
                fontWeight={"semibold"}
              >
                Salário
              </Text>
              <Text
                fontFamily={"Outfit-500"}
                fontSize={"14px"}
                color={"#2E2E2E"}
                fontWeight={"normal"}
              >
                {props.vaga?.salario}
              </Text>
            </VStack>
          </VStack>

          <VStack space={"10px"} direction={"column"}>
            <VStack space={"2px"} direction={"column"}>
              <Text
                fontFamily={"Outfit-500"}
                fontSize={"14px"}
                color={"#2E2E2E"}
                fontWeight={"semibold"}
              >
                Estado
              </Text>
              <Text
                fontFamily={"Outfit-500"}
                fontSize={"14px"}
                color={"#2E2E2E"}
                fontWeight={"normal"}
              >
                {props.vaga?.empresa_estado}
              </Text>
            </VStack>
            <VStack space={"2px"} direction={"column"}>
              <Text
                fontFamily={"Outfit-500"}
                fontSize={"14px"}
                color={"#2E2E2E"}
                fontWeight={"semibold"}
              >
                Cidade
              </Text>
              <Text
                fontFamily={"Outfit-500"}
                fontSize={"14px"}
                color={"#2E2E2E"}
                fontWeight={"normal"}
              >
                {props.vaga?.empresa_cidade}
              </Text>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
      {user?.tipo === "CANDIDATO" && (
        <VStack space={"20px"}>
          <Button
            onPress={() => {
              if (isMatch && isMatch?.match !== true) {
                mutateTirarLike();
              } else {
                mutateAddLike({
                  id_usuario: user?.id ? user.id : 1,
                  id_vaga: props.vaga?.id,
                });
              }
              isLike === true ? setIsLike(false) : setIsLike(true);
            }}
            bg={isLike === true ? "#6D3BBF" : "white"}
            borderColor={"#6D3BBF"}
            borderWidth={"2px"}
            rounded={"full"}
            py={"10px"}
            px={"25px"}
            w={"full"}
          >
            <HStack space={"10px"} alignItems={"center"}>
              <IconCoracao
                fill={isLike === true ? "#FF5757" : "white"}
                borderColor={"#6D3BBF"}
              />
              <Text
                fontFamily={"Outfit-500"}
                color={isLike === true ? "white" : "#6D3BBF"}
                fontSize={"18px"}
                fontWeight={"semibold"}
                textAlign={"center"}
              >
                Me Interessei
              </Text>
            </HStack>
          </Button>
          {isMatch?.match === true && (
            <HStack space={"8px"} w={"full"}>
              <HStack
                bg={"#289C65"}
                py={"10px"}
                px={"25px"}
                rounded={"full"}
                space={"10px"}
                alignItems={"center"}
                justifyContent={"center"}
                flex={1}
              >
                <IconMatch />
                <Text
                  color={"white"}
                  fontSize={"16px"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                  fontFamily={"Outfit-500"}
                >
                  Deu Match
                </Text>
              </HStack>

              <Chat match={isMatch} />
            </HStack>
          )}
        </VStack>
      )}
      {user?.tipo === "RECRUTADOR" && route.name !== "Feed" && (
        <>
          <Button
            onPress={props.onPressInteressados}
            bg={"#6D3BBF"}
            borderColor={"#6D3BBF"}
            borderWidth={"2px"}
            rounded={"full"}
            py={"10px"}
            px={"25px"}
            w={"full"}
          >
            <HStack space={"10px"} alignItems={"center"}>
              <IconCoracao fill={"#FF5757"} borderColor={"#6D3BBF"} />
              <Text
                fontFamily={"Outfit-500"}
                color={"white"}
                textAlign={"center"}
                fontSize={"18px"}
                fontWeight={"semibold"}
              >
                {props.vaga?.vaga_candidato?.length} Candidatos Interessados
              </Text>
            </HStack>
          </Button>
          <VStack space={"25px"}>
            <HStack space={"8px"} w={"full"}>
              <EditarVaga
                vaga={props.vaga}
                refetch={() => {
                  props.refetch();
                }}
              />
              <Button
                onPress={() => {
                  if (props.vaga?.situacao === "ATIVO") {
                    mutateAtualizarSituacaoVaga({
                      situacao: "INATIVO",
                    });
                  } else {
                    mutateAtualizarSituacaoVaga({
                      situacao: "ATIVO",
                    });
                  }
                }}
                bg={props.vaga?.situacao === "ATIVO" ? "white" : "#6D3BBF"}
                borderColor={"#6D3BBF"}
                borderWidth={"2px"}
                rounded={"full"}
                py={"10px"}
                px={"25px"}
                flex={1}
              >
                <HStack
                  space={"10px"}
                  alignItems={"center"}
                  color={props.vaga?.situacao === "ATIVO" ? "#6D3BBF" : "white"}
                >
                  <IconDesativarVaga
                    fill={
                      props.vaga?.situacao === "ATIVO" ? "#6D3BBF" : "white"
                    }
                  />
                  <Text
                    color={
                      props.vaga?.situacao === "ATIVO" ? "#6D3BBF" : "white"
                    }
                    fontFamily={"Outfit-500"}
                    fontSize={"18px"}
                    fontWeight={"semibold"}
                    textAlign={"center"}
                  >
                    Inativar
                  </Text>
                </HStack>
              </Button>
            </HStack>
          </VStack>
        </>
      )}

      <VStack justifyContent={"space-between"} alignItems={"center"}>
        <Pressable onPress={props.onPressUsuario}>
          <Text
            fontFamily={"Outfit-500"}
            color={"#868686"}
            fontSize={"13px"}
            fontWeight={"normal"}
            display={"flex"}
            alignItems={"center"}
          >
            Publicado por {props.vaga?.usuario?.nome}
          </Text>
        </Pressable>
        <Text
          fontFamily={"Outfit-500"}
          color={"#868686"}
          fontSize={"13px"}
          fontWeight={"normal"}
        >
          {dayjs(props.vaga?.created_at).format("DD/MM/YYYY")} às{" "}
          {dayjs(props.vaga?.created_at).format("HH:mm")}
        </Text>
      </VStack>
    </VStack>
  );
};

export default CardVaga;
