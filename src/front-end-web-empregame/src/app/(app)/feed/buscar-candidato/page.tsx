"use client";

import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Image,
  Text,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import CardCandidato from "../components/CardCandidato";
import { useState } from "react";
import { useFetch } from "@/utils/hooks/useFetch";
import { IUsuario } from "@/interface/IUsuario";

const BuscarCandidato = () => {
  const toast = useToast();
  const setHardskillFilter = new Set();
  const setSoftskillFilter = new Set();
  const [pesquisa, setPesquisa] = useState<string | null>(null);
  const [hardskill, setHardskill] = useState<string | null>(null);
  const [softskill, setSoftskill] = useState<string | null>(null);

  const { data: candidatos, isFetching } = useFetch<IUsuario[]>(
    "/usuarios/candidatos",
    {
      params: { pesquisa, hardskill, softskill, situacao: "ATIVO" },
      itensRefresh: [pesquisa, hardskill, softskill],
      onError: (err) => {
        if (err.response?.data)
          toast({ title: err.response.data.message, status: "error" });
      },
    }
  );

  const { data: hardskills } = useFetch<IHardskill[]>("/hardskills", {
    onError: (err) => {
      if (err.response?.data)
        toast({ title: err.response.data.message, status: "error" });
    },
  });

  const filterHardskills = hardskills?.filter((hardskill) => {
    const duplicatedHardskills = setHardskillFilter.has(hardskill.nome);
    setHardskillFilter.add(hardskill.nome);
    return !duplicatedHardskills;
  });

  const { data: softskills } = useFetch<ISoftskill[]>("/softskills", {
    onError: (err) => {
      if (err.response?.data)
        toast({ title: err.response.data.message, status: "error" });
    },
  });

  const filterSoftskills = softskills?.filter((softskill) => {
    const duplicatedSoftskills = setSoftskillFilter.has(softskill.nome);
    setSoftskillFilter.add(softskill.nome);
    return !duplicatedSoftskills;
  });

  return (
    <>
      {isFetching ? (
        <Flex justifyContent={"center"} pt={"200px"}>
          <CircularProgress isIndeterminate color="#5A2DA4" />
        </Flex>
      ) : (
        <Flex
          width={"60%"}
          direction={"column"}
          gap={"20px"}
          alignItems={"center"}
        >
          {candidatos?.map((candidato) => (
            <CardCandidato
              key={candidato.id + candidato.nome}
              candidato={candidato}
            />
          ))}
        </Flex>
      )}

      <Flex width={"20%"} direction={"column"} gap={"18px"}>
        <Text color={"#5A2DA4"} fontSize={"18px"} fontWeight={"semibold"}>
          Pesquisar Candidato
        </Text>
        <InputGroup marginBottom={"10px"}>
          <Input
            placeholder={"Digite aqui"}
            onChange={(e) => setPesquisa(e.target.value)}
            py={"10px"}
            px={"25px"}
            _placeholder={{ color: "#ADADAD" }}
            color={"#2E2E2E"}
            bg={"white"}
            rounded={"full"}
            fontSize={"16px"}
            fontWeight={"medium"}
            focusBorderColor={"#5A2DA4"}
            borderColor={"#2E2E2E"}
          />
          <InputRightElement cursor={"pointer"}>
            <Image src={"../../icons/icon-lupa.svg"} alt={"lupa"} />
          </InputRightElement>
        </InputGroup>
        <Text color={"#5A2DA4"} fontSize={"18px"} fontWeight={"semibold"}>
          Filtrar Candidatos
        </Text>
        <InputGroup flexDirection={"column"} gap={"5px"}>
          <Text fontSize={"16px"} color={"#2E2E2E"} fontWeight={"medium"}>
            HardSkill
          </Text>
          <Select
            placeholder={"Selecionar"}
            onChange={(e) => setHardskill(e.target.value)}
            _placeholder={{ color: "#ADADAD" }}
            color={"#2E2E2E"}
            bg={"white"}
            rounded={"full"}
            fontSize={"16px"}
            fontWeight={"medium"}
            focusBorderColor={"#5A2DA4"}
            borderColor={"#2E2E2E"}
          >
            {filterHardskills?.map((hardskill) => (
              <option
                key={hardskill.id + hardskill.nome}
                value={hardskill.nome}
              >
                {hardskill.nome}
              </option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup flexDirection={"column"} gap={"5px"}>
          <Text fontSize={"16px"} color={"#2E2E2E"} fontWeight={"medium"}>
            SoftSkill
          </Text>
          <Select
            placeholder={"Selecionar"}
            onChange={(e) => setSoftskill(e.target.value)}
            _placeholder={{ color: "#ADADAD" }}
            color={"#2E2E2E"}
            bg={"white"}
            rounded={"full"}
            fontSize={"16px"}
            fontWeight={"medium"}
            focusBorderColor={"#5A2DA4"}
            borderColor={"#2E2E2E"}
          >
            {filterSoftskills?.map((softskill) => (
              <option
                key={softskill.id + softskill.nome}
                value={softskill.nome}
              >
                {softskill.nome}
              </option>
            ))}
          </Select>
        </InputGroup>
      </Flex>
    </>
  );
};

export default BuscarCandidato;
