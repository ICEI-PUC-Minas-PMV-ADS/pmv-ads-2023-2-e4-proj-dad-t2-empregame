import { Input, Pressable } from "native-base";
import { useState } from "react";
import { IconOlhoSenha } from "./icons";

export const InputPassword = (props: {
  placeholder: string;
  onChange: (text: string) => void | undefined;
  value?: string;
}) => {
  const [show, setShow] = useState(true);
  const handleClick = () => setShow(!show);
  return (
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
  );
};
