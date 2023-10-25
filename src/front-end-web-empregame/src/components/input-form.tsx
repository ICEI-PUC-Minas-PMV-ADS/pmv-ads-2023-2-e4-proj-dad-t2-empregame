import { Input } from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

export const InputForm = (props: {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Input
      placeholder={props.placeholder}
      onChange={props.onChange}
      py={"10px"}
      px={"25px"}
      _placeholder={{ color: "#ADADAD" }}
      color={"#2E2E2E"}
      bg={"white"}
      rounded={"full"}
      fontSize={"16px"}
      fontWeight={"medium"}
      focusBorderColor={"#5A2DA4"}
    />
  );
};
