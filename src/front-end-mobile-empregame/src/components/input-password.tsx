import { Input, Pressable, Text, VStack } from "native-base";
import { useState } from "react";
import { IconOlhoSenha } from "./icons";

export const InputPassword = (props: {
  placeholder: string;
  onChange: (text: string) => void | undefined;
  value?: string;
  messageError?: string;
}) => {
  const [show, setShow] = useState(true);
  const handleClick = () => setShow(!show);
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
        type={"password"}
        value={props.value}
        secureTextEntry={show ? true : false}
        InputRightElement={
          <Pressable onPress={handleClick} bg={"none"} paddingRight={"20px"}>
            <IconOlhoSenha fill={show ? "#C4B5D2" : "#7345D6"} />
          </Pressable>
        }
      />
      {props.messageError && (
        <Text color={"red.400"} fontSize={"14px"} pl={"10px"}>
          {props.messageError}
        </Text>
      )}
    </VStack>
  );
};
