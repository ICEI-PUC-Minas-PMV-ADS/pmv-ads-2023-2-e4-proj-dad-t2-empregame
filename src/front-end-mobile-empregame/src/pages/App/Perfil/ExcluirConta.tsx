import { AlertDialog, Button, Text } from "native-base";
import { useRef, useState } from "react";
import { useMutation } from "../../../utils/hooks/useMutation";
import Toast from "react-native-toast-message";
import { useAuth } from "../../../context/auth";

export const ExcluirConta = () => {
  const { deslogarSubmit } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);

  const { mutate: mutateExcluirConta, isFetching: isFetchingExcluirConta } =
    useMutation<void>("/usuarios", {
      method: "DELETE",
      onSuccess: () => {
        Toast.show({
          text1: "Conta excluída com sucesso!",
          text2: "Você será desconectado",
          type: "success",
        });
        deslogarSubmit();
        onClose();
      },
      onError: (err) => {
        if (err.response?.data)
          Toast.show({ text1: err.response.data.message, type: "error" });
      },
    });
  return (
    <>
      <Button bg={"none"} w={"full"} py={1} onPress={() => setIsOpen(!isOpen)}>
        <Text color={"white"} fontFamily={"Outfit-600"}>
          Excluir Conta
        </Text>
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Excluir conta</AlertDialog.Header>
          <AlertDialog.Body>
            Você tem certeza que deseja deletar sua conta?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancelar
              </Button>
              <Button
                isLoading={isFetchingExcluirConta}
                isLoadingText="Excluindo"
                colorScheme="danger"
                onPress={() => {
                  mutateExcluirConta();
                }}
              >
                Excluir
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};
