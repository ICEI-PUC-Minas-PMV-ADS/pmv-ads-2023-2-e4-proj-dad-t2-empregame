import { Button } from "@chakra-ui/react";
import { KeyboardEventHandler, MouseEventHandler } from "react";

export const ButtonPrimary = (props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  loadingText?: string;
  buttonText: string;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      onKeyDown={props.onKeyDown}
      onClick={props.onClick}
      isLoading={props.isLoading}
      loadingText={props.loadingText}
      color={"white"}
      fontSize={"18px"}
      fontWeight={"semibold"}
      bg={"#5A2DA4"}
      rounded={"full"}
      py={"10px"}
      px={"25px"}
      w={"full"}
      mb={"18px"}
      _hover={{
        bg: "#2E2E2E",
        transition: "ease-in",
        boxShadow: "lg",
      }}
    >
      {props.buttonText}
    </Button>
  );
};
