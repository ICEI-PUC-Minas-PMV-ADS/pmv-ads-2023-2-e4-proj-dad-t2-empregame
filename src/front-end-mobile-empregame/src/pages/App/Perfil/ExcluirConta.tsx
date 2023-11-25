import { AlertDialog, Button, Text } from "native-base";
import { useRef, useState } from "react";

export const ExcluirConta = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
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
              <Button colorScheme="danger" onPress={onClose}>
                Excluir
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};
