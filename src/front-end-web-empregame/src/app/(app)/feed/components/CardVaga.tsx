import { IVaga } from "@/interface/IVaga";
import { useAppContext } from "@/utils/hooks/useContext";
import { useMutation } from "@/utils/hooks/useMutation";
import {
  Flex,
  Divider,
  Button,
  Image,
  Text,
  Box,
  Link,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ModalCandidatosInteressados from "./ModalCandidatosInteressados";
import ModalChat from "./ModalChat";
import ModalEditarVaga from "./ModalEditarVaga";

const CardVaga = (props: { vaga?: IVaga | null; refetch: () => void }) => {
  const {
    state: { usuario },
  } = useAppContext();
  const patch = usePathname();
  const isMatch = props.vaga?.vaga_candidato?.find(
    (e) => e.id_usuario === usuario?.id
  );

  const [isLike, setIsLike] = useState<boolean>(isMatch ? true : false);

  const { mutate: mutateTirarLike, isFetching: isFetchingTirarLike } =
    useMutation<void>("/vagas/match/" + isMatch?.id, {
      method: "DELETE",
      onSuccess: () => {
        props.refetch();
      },
    });

  const { mutate: mutateAddLike, isFetching: isFetchingAddLike } = useMutation<{
    id_usuario?: number | null;
    id_vaga?: number | null;
  }>("/vagas/match", {
    method: "POST",
    onSuccess: () => {
      props.refetch();
    },
  });

  return (
    <Flex
      direction={"column"}
      py={"25px"}
      px={"30px"}
      gap={"25px"}
      borderWidth={"1px"}
      borderColor={"#E1E1E1"}
      rounded={"13px"}
      bg={"white"}
      width={"100%"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={"15px"} alignItems={"center"}>
          <Image src={"../../icons/icon-maleta.svg"} alt={"maleta"} />
          <Text fontSize={"20px"} fontWeight={"bold"} color={"#2E2E2E"}>
            {props.vaga?.nome}
          </Text>
        </Flex>
        {isMatch?.match === true && (
          <Box
            bg={"#289C65"}
            py={"5px"}
            px={"10px"}
            fontSize={"14px"}
            color={"white"}
            fontWeight={"medium"}
            textAlign={"center"}
            rounded={"6px"}
          >
            <Flex gap={"10px"}>
              <Image src={"../../icons/icon-match.svg"} alt={"match"}></Image>
              <Text>Deu Match</Text>
            </Flex>
          </Box>
        )}
      </Flex>
      <Flex gap={"8px"} alignItems={"center"}>
        {props.vaga?.vaga_hardskill?.map((hardskill) => (
          <Box
            key={hardskill.id}
            bg={"#5A2DA4"}
            py={"5px"}
            px={"10px"}
            fontSize={"14px"}
            color={"white"}
            fontWeight={"medium"}
            textAlign={"center"}
            rounded={"full"}
          >
            {hardskill?.hardskill?.nome}
          </Box>
        ))}
        {props.vaga?.vaga_softskill?.map((softskill) => (
          <Box
            key={softskill.id}
            bg={"#5A2DA4"}
            py={"5px"}
            px={"10px"}
            fontSize={"14px"}
            color={"white"}
            fontWeight={"medium"}
            textAlign={"center"}
            rounded={"full"}
          >
            {softskill?.softskill?.nome}
          </Box>
        ))}
      </Flex>
      <Flex gap={"15px"}>
        <Flex gap={"15px"} direction={"column"} w={"80%"} h={"full"}>
          <Flex gap={"5px"} direction={"column"}>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"semibold"}>
              Descrição
            </Text>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"normal"}>
              {props.vaga?.descricao}
            </Text>
          </Flex>
          <Flex gap={"5px"} direction={"column"}>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"semibold"}>
              Benefícios
            </Text>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"normal"}>
              {props.vaga?.beneficios}
            </Text>
          </Flex>
          <Flex gap={"7px"}>
            <Image src={"../../icons/icon-person.svg"} alt={"pessoa"}></Image>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"normal"}>
              {props.vaga?.vaga_candidato?.length} pessoas interessadas
            </Text>
          </Flex>
        </Flex>
        <Divider orientation={"vertical"} w={"1px"} h={"full"} bg={"#E1E1E1"} />
        <Flex gap={"10px"} direction={"column"} w={"20%"} h={"full"}>
          <Flex gap={"2px"} direction={"column"}>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"semibold"}>
              Empresa
            </Text>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"normal"}>
              {props.vaga?.empresa_nome}
            </Text>
          </Flex>
          <Flex gap={"2px"} direction={"column"}>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"semibold"}>
              Estado
            </Text>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"normal"}>
              {props.vaga?.empresa_estado}
            </Text>
          </Flex>
          <Flex gap={"2px"} direction={"column"}>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"semibold"}>
              Cidade
            </Text>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"normal"}>
              {props.vaga?.empresa_cidade}
            </Text>
          </Flex>
          <Flex gap={"2px"} direction={"column"}>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"semibold"}>
              Salário
            </Text>
            <Text fontSize={"14px"} color={"#2E2E2E"} fontWeight={"normal"}>
              {props.vaga?.salario}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {usuario?.tipo === "CANDIDATO" && (
        <Flex gap={"20px"}>
          <Button
            onClick={() => {
              if (isMatch && isMatch?.match !== true) {
                mutateTirarLike();
              } else {
                mutateAddLike({
                  id_usuario: usuario.id,
                  id_vaga: props.vaga?.id,
                });
              }
              isLike === true ? setIsLike(false) : setIsLike(true);
            }}
            gap={"10px"}
            color={isLike === true ? "white" : "#6D3BBF"}
            fontSize={"18px"}
            fontWeight={"semibold"}
            bg={isLike === true ? "#6D3BBF" : "white"}
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
            <IconCoracao
              fill={isLike === true ? "#FF5757" : "white"}
              borderColor={"#6D3BBF"}
            />
            Me Interessei
          </Button>
          {isMatch?.match === true && <ModalChat />}
        </Flex>
      )}
      {usuario?.tipo === "RECRUTADOR" && patch !== "/feed" && (
        <>
          <ModalCandidatosInteressados
            idVaga={props.vaga?.id}
            refetch={() => {}}
            qtdCandidatosInteressados={props.vaga?.vaga_candidato?.length}
          />
          <Flex gap={"25px"}>
            <ModalEditarVaga refetch={() => {}} />
            <Button
              onClick={() => {}}
              gap={"10px"}
              color={"#6D3BBF"}
              fontSize={"18px"}
              fontWeight={"semibold"}
              bg={"white"}
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
              <IconDesativarVaga />
              Inativar Vaga
            </Button>
          </Flex>
        </>
      )}

      <Flex justifyContent={"space-between"}>
        <Text color={"#868686"} fontSize={"13px"} fontWeight={"normal"}>
          Publicado por{" "}
          <Link
            href={"/perfil?id=" + props.vaga?.id_usuario}
            target="_blank"
            color={"#535353"}
            fontWeight={"medium"}
          >
            {props.vaga?.usuario?.nome}
          </Link>
        </Text>
        <Text color={"#868686"} fontSize={"13px"} fontWeight={"normal"}>
          {dayjs(props.vaga?.created_at).format("DD/MM/YYYY")} às{" "}
          {dayjs(props.vaga?.created_at).format("h:mm")}hrs
        </Text>
      </Flex>
    </Flex>
  );
};

export default CardVaga;

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

const IconDesativarVaga = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
    >
      <g clipPath="url(#clip0_38_2731)">
        <path
          d="M14.3426 17.482C14.8706 18.01 14.5864 18.9111 13.8531 19.0467C13.8457 19.0476 13.8384 19.0495 13.8311 19.0504C13.5359 19.1045 13.2297 19.0018 13.0171 18.7891L2.78156 8.55456C2.45065 8.22365 2.41765 7.70023 2.70548 7.33173C2.70915 7.32715 2.71281 7.32165 2.7174 7.31706C3.05748 6.88256 3.7074 6.8459 4.09698 7.2364L14.3426 17.482ZM1.23423 9.60048C1.10315 9.84981 0.994979 10.0716 0.913396 10.2495C0.696146 10.7271 0.696146 11.2743 0.913396 11.7528C0.950979 11.8362 0.999562 11.9352 1.04815 12.0351L6.47023 17.4572C7.18706 18.1741 8.08173 18.6911 9.06715 18.9266C9.14598 18.9459 9.22573 18.9633 9.3064 18.9807C9.79865 19.0871 10.1332 18.5004 9.77756 18.1447L1.23423 9.60048ZM22.4816 20.4355C22.8401 20.7939 22.8401 21.3732 22.4816 21.7316C22.3029 21.9104 22.0682 22.0002 21.8336 22.0002C21.5989 22.0002 21.3642 21.9104 21.1855 21.7316L1.01881 1.56498C0.660396 1.20656 0.660396 0.627229 1.01881 0.268813C1.37723 -0.0896042 1.95656 -0.0896042 2.31498 0.268813L6.22731 4.18115C7.91215 3.23148 9.76748 2.75023 11.7502 2.75023C17.4262 2.75023 20.6602 6.63506 22.082 8.95056C22.9785 10.4099 22.9785 12.2231 22.082 13.6824C21.5026 14.6256 20.5438 15.9493 19.1688 17.1226L22.4816 20.4355ZM8.56573 6.51956L9.8894 7.84323C10.4357 7.51965 11.0719 7.33448 11.7511 7.33448C13.7733 7.33448 15.4178 8.97898 15.4178 11.0011C15.4178 11.6804 15.2317 12.3166 14.9091 12.8629L16.2318 14.1856C16.8726 13.2864 17.2511 12.1873 17.2511 11.0011C17.2511 7.9679 14.7844 5.50115 11.7511 5.50115C10.565 5.50115 9.4659 5.87881 8.56665 6.52048L8.56573 6.51956Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_38_2731">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0.75)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
