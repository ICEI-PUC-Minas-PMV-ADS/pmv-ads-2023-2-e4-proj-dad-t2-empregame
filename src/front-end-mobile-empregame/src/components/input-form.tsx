import { Input, KeyboardAvoidingView, Text, VStack } from "native-base";
import { KeyboardTypeOptions } from "react-native";

export const InputForm = (props: {
  placeholder: string;
  onChange: ((text: string) => void) | undefined;
  type: "password" | "text" | undefined;
  value?: string | undefined;
  keyboardType?: KeyboardTypeOptions | undefined;
  InputRightElement?: JSX.Element | JSX.Element[] | undefined;
  messageError?: string;
}) => {
  return (
    <VStack>
      <Input
        fontFamily={"Outfit-500"}
        placeholder={props.placeholder}
        onChangeText={props.onChange}
        py={"10px"}
        px={"25px"}
        placeholderTextColor={"#ADADAD"}
        color={"#2E2E2E"}
        backgroundColor={"white"}
        rounded={"full"}
        fontSize={"16px"}
        fontWeight={"medium"}
        type={props.type}
        value={props.value}
        keyboardType={props.keyboardType}
        InputRightElement={props.InputRightElement}
      />
      {props.messageError && (
        <Text color={"red.400"} fontSize={"14px"} pl={"10px"}>
          {props.messageError}
        </Text>
      )}
    </VStack>
  );
};
