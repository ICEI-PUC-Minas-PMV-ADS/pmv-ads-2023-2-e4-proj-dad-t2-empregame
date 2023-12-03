import { Box, Select, Text, VStack } from "native-base";
import { DropdownIcon } from "./icons";

export const SelectPrimary = (props: {
  children?: React.ReactNode;
  defaultValue?: string | undefined;
  onValueChange: ((itemValue: string) => void) | undefined;
  placeholder?: string;
  messageError?: string;
}) => {
  return (
    <VStack>
      <Select
        placeholder={props.placeholder ? props.placeholder : "Selecionar"}
        fontFamily={"Outfit-500"}
        color={"white"}
        fontSize={"18px"}
        bg={"#5A2DA4"}
        rounded={"full"}
        py={"10px"}
        px={"25px"}
        w={"full"}
        borderWidth={"0px"}
        dropdownIcon={
          <Box paddingRight={"15px"}>
            <DropdownIcon />
          </Box>
        }
        onValueChange={props.onValueChange}
        defaultValue={props.defaultValue}
      >
        {props.children}
      </Select>
      {props.messageError && (
        <Text color={"red.400"} fontSize={"14px"} pl={"10px"}>
          {props.messageError}
        </Text>
      )}
    </VStack>
  );
};
