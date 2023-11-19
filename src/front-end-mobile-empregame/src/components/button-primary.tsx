import { Button, Text } from "native-base";
import { KeyboardEventHandler, MouseEventHandler } from "react";
import { GestureResponderEvent } from "react-native";

export const ButtonPrimary = (props: {
  isLoading?: boolean;
  loadingText?: string;
  buttonText: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}) => {
  return (
    <Button
      fontFamily={"Outfit-600"}
      onPress={props.onPress}
      isLoading={props.isLoading}
      isLoadingText={props.loadingText}
      color={"white"}
      fontSize={"18px"}
      bg={"#5A2DA4"}
      rounded={"full"}
      py={"10px"}
      px={"25px"}
      w={"full"}
      mb={"18px"}
      marginY={"8px"}
    >
      <Text
        fontFamily={"Outfit-600"}
        textAlign={"center"}
        color={"white"}
        fontSize={"18px"}
      >
        {props.buttonText}
      </Text>
    </Button>
  );
};
