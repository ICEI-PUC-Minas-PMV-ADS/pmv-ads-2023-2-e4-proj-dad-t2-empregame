import { Flex, Select, Text } from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

const InputSelect = (props: {
  children: string | JSX.Element | JSX.Element[] | any;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value?: string | number | readonly string[];
  messageError?: string;
}) => {
  return (
    <Flex flexDirection={"column"}>
      <Select
        placeholder={props.placeholder}
        onChange={props.onChange}
        _placeholder={{ color: "#ADADAD" }}
        color={"#2E2E2E"}
        bg={"white"}
        rounded={"full"}
        fontSize={"16px"}
        fontWeight={"medium"}
        focusBorderColor={"#5A2DA4"}
        value={props.value}
      >
        {props.children}
      </Select>
      <Text color={"red.400"} fontSize={"14px"}>
        {props.messageError}
      </Text>
    </Flex>
  );
};

export default InputSelect;
