import { Select } from "@chakra-ui/react";
import { ChangeEventHandler } from "react";

const InputSelect = (props: {
  children: string | JSX.Element | JSX.Element[] | any;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value?: string | number | readonly string[];
}) => {
  return (
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
  );
};

export default InputSelect;
