import { authToken } from "@/utils/config/authToken";
import { useAppContext } from "@/utils/hooks/useContext";
import { useMutation } from "@/utils/hooks/useMutation";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useRef } from "react";
import { useCookies } from "react-cookie";

const ExcluirConta = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef<any>();
  const { dispatch: dispatchAppContext } = useAppContext();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([authToken.nome]);

  const { mutate: mutateExcluirConta, isFetching: isFetchingExcluirConta } =
    useMutation<void>("/usuarios", {
      method: "DELETE",
      onSuccess: () => {
        toast({
          title: "Conta excluída com sucesso!",
          description: "Você será desconectado",
          status: "success",
        });
        router.push("/");
        removeCookie(authToken.nome);
        dispatchAppContext({ payload: null, type: "SET_USUARIO" });
        onClose();
      },
      onError: (err) => {
        if (err.response?.data)
          toast({ title: err.response.data.message, status: "error" });
      },
    });

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
        <Image src={"./icons/icon-delete.svg"} alt="icone deletar" />
        Excluir conta
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir conta
            </AlertDialogHeader>

            <AlertDialogBody>
              Você tem certeza que deseja deletar sua conta?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => mutateExcluirConta()}
                ml={3}
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default ExcluirConta;
