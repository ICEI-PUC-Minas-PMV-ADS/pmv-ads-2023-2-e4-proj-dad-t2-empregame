import { Input, Button, Pressable } from "native-base";
import { ChangeEventHandler, KeyboardEventHandler, useState } from "react";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import Svg, { Path } from "react-native-svg";

export const InputPassword = (props: {
  placeholder: string;
  onChange: (text: string) => void | undefined;
  value?: string;
}) => {
  const [show, setShow] = useState(false);
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

const IconOlhoSenha = (props: { fill: string }) => (
  <Svg width={"19px"} height={"18px"}>
    <Path
      fill={props.fill}
      d="M18.858 8.386c-.695-1.44-3.42-6.136-9.358-6.136C3.563 2.25.837 6.946.142 8.386a1.412 1.412 0 0 0 0 1.23c.695 1.438 3.42 6.134 9.358 6.134 5.938 0 8.663-4.696 9.358-6.136a1.411 1.411 0 0 0 0-1.228ZM9.5 13.5a4.94 4.94 0 0 1-2.639-.758 4.562 4.562 0 0 1-1.75-2.02 4.28 4.28 0 0 1-.27-2.6 4.432 4.432 0 0 1 1.3-2.304 4.837 4.837 0 0 1 2.432-1.232 4.996 4.996 0 0 1 2.745.257c.868.34 1.61.917 2.132 1.657.521.74.8 1.61.8 2.5a4.388 4.388 0 0 1-1.393 3.18A4.892 4.892 0 0 1 9.5 13.5Z"
    />
    <Path
      fill={props.fill}
      d="M9.5 12c1.749 0 3.167-1.343 3.167-3S11.249 6 9.5 6C7.751 6 6.333 7.343 6.333 9s1.418 3 3.167 3Z"
    />
  </Svg>
);
