import { Box, Menu, Pressable, Text } from "native-base";
import { IconHamburguer } from "./icons";

import { GestureResponderEvent } from "react-native";

export const MenuHeader = (props: {
  onPressPerfil: (event: GestureResponderEvent) => void | null | undefined;
  onPressDeslogar: (event: GestureResponderEvent) => void | null | undefined;
}) => {
  return (
    <Box paddingX={8}>
      <Menu
        placement="bottom left"
        w="250px"
        marginRight={3}
        background={"#6D3BBF"}
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="Menu" {...triggerProps}>
              <IconHamburguer style={{ marginBottom: 10 }} />
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={props.onPressPerfil}>
          <Text color={"white"} fontFamily={"Outfit-600"}>
            Meu Perfil
          </Text>
        </Menu.Item>
        <Menu.Item onPress={props.onPressDeslogar}>
          <Text color={"white"} fontFamily={"Outfit-600"}>
            Deslogar
          </Text>
        </Menu.Item>
      </Menu>
    </Box>
  );
};
