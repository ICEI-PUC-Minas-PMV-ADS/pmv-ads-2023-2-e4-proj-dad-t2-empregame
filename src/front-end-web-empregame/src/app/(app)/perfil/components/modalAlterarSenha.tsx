import { ButtonPrimary } from "@/components/button-primary";
import { InputPassword } from "@/components/input-password";
import { useMutation } from "@/utils/hooks/useMutation";
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
  Flex,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ModalAlterarSenha = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [errors, setErrors] = useState<{ field: string; message: string }[]>(
    []
  );
  const [atualSenha, setAtualSenha] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");

  const { mutate: mutateAtualizarSenha, isFetching: isFetchingAtualizarSenha } =
    useMutation<{
      senha_atual: string;
      senha_nova: string;
    }>("/auth/update-senha", {
      method: "POST",
      onSuccess: () => {
        toast({ title: "Senha atualizada com sucesso!", status: "success" });
        onClose();
      },
      onError: (err) => {
        if (err.response?.data)
          toast({ title: err.response.data.message, status: "error" });
      },
    });

  const atualizarDados = () => {
    const erros: { field: string; message: string }[] = [];

    setErrors([]);

    if (!atualSenha)
      erros.push({
        field: "atualSenha",
        message: "Preencha o campo Senha Atual",
      });
    if (!novaSenha)
      erros.push({
        field: "novaSenha",
        message: "Preencha o campo Nova Senha",
      });

    if (erros.length > 0) {
      toast({
        title: "Campos incompletos/incorretos",
        status: "error",
      });
      return setErrors(erros);
    }
    mutateAtualizarSenha({
      senha_atual: atualSenha,
      senha_nova: novaSenha,
    });
  };
  useEffect(() => {
    setErrors([]);
  }, [novaSenha, atualSenha]);

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
        <Image src={"./icons/icon-password.svg"} alt="icone senha" />
        Alterar senha
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} gap={"15px"} color={"#5A2DA4"}>
            <Image
              src={"./icons/icon-editar-senha.svg"}
              alt="icone editar senha"
            />
            Alterar senha
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"15px"} direction={"column"}>
              <InputPassword
                placeholder="Senha Atual"
                onChange={(e) => setAtualSenha(e.target.value)}
                messageError={
                  errors.find((e) => e.field === "atualSenha")?.message
                }
              />
              <InputPassword
                placeholder="Nova Senha"
                onChange={(e) => setNovaSenha(e.target.value)}
                messageError={
                  errors.find((e) => e.field === "novaSenha")?.message
                }
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <ButtonPrimary
              onClick={() => atualizarDados()}
              buttonText="Salvar"
              loadingText="Salvando"
              isLoading={isFetchingAtualizarSenha}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAlterarSenha;
