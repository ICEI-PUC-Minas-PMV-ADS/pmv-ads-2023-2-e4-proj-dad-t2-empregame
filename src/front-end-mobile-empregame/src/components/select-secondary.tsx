import { Box, Select, Text, VStack } from "native-base";
import { DropdownIcon } from "./icons";

export const SelectSecondary = (props: {
  children?: React.ReactNode;
  defaultValue?: string | undefined;
  onValueChange: ((itemValue: string) => void) | undefined;
  placeholder?: string;
  messageError?: string;
}) => {
  return (
    <>
      <Select
        placeholder={props.placeholder ? props.placeholder : "Selecionar"}
        fontFamily={"Outfit-500"}
        py={"10px"}
        px={"25px"}
        placeholderTextColor={"#2E2E2E"}
        color={"#2E2E2E"}
        rounded={"full"}
        fontSize={"16px"}
        fontWeight={"medium"}
        flex={1}
        dropdownIcon={
          <Box paddingRight={"15px"}>
            <DropdownIcon fill="#2E2E2E" />
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
    </>
  );
};
