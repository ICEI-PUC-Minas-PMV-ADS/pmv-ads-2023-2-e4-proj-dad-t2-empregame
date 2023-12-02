import { Text, Input, Flex, InputGroup } from "@chakra-ui/react";
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  ReactNode,
} from "react";

export const InputForm = (props: {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
  value?: string | number | readonly string[];
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  InputRightElement?: ReactNode;
  messageError?: string;
}) => {
  return (
    <Flex flexDirection={"column"}>
      <InputGroup>
        <Input
          onKeyDown={props.onKeyDown}
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
          type={props.type}
          value={props.value}
        />
        {props.InputRightElement}
      </InputGroup>

      <Text color={"red.400"} fontSize={"14px"}>
        {props.messageError}
      </Text>
    </Flex>
  );
};
