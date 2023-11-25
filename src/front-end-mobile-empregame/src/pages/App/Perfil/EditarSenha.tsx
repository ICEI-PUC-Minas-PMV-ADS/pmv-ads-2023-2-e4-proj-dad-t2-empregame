import { Button, Modal, Text, VStack } from "native-base";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { useMutation } from "../../../utils/hooks/useMutation";
import { InputPassword } from "../../../components/input-password";
import { ButtonPrimary } from "../../../components/button-primary";

export const EditarSenha = () => {
  const [showModal, setShowModal] = useState(false);
  const [atualSenha, setAtualSenha] = useState<string>("");
  const [novaSenha, setNovaSenha] = useState<string>("");

  const { mutate: mutateAtualizarSenha, isFetching: isFetchingAtualizarSenha } =
    useMutation<{
      senha_atual: string;
      senha_nova: string;
    }>("/auth/update-senha", {
      method: "POST",
      onSuccess: () => {
        Toast.show({ text1: "Senha atualizada com sucesso!", type: "success" });
        setShowModal(false);
      },
      onError: (err) => {
        if (err.response?.data)
          Toast.show({ text1: err.response.data.message, type: "error" });
      },
    });

  const atualizarDados = () => {
    mutateAtualizarSenha({
      senha_atual: atualSenha,
      senha_nova: novaSenha,
    });
  };
  return (
    <>
      <Button bg={"none"} w={"full"} py={1} onPress={() => setShowModal(true)}>
        <Text color={"white"} fontFamily={"Outfit-600"}>
          Alterar Senha
        </Text>
      </Button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"xl"}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>
            <Text color={"#5A2DA4"} fontFamily={"Outfit-600"} fontSize={"18px"}>
              Alterar senha
            </Text>
          </Modal.Header>
          <Modal.Body>
            <VStack space={"15px"}>
              <InputPassword
                placeholder="Senha Atual"
                onChange={(e) => setAtualSenha(e)}
              />
              <InputPassword
                placeholder="Nova Senha"
                onChange={(e) => setNovaSenha(e)}
              />
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <ButtonPrimary
                onPress={() => atualizarDados()}
                buttonText="Salvar"
                loadingText="Salvando"
                isLoading={isFetchingAtualizarSenha}
              />
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
