import { Link } from "@chakra-ui/react";
import { MouseEventHandler } from "react";

export const ButtonNavigation = (props: {
  buttonText: string;
  bg: string;
  borderColor?: string;
  borderWidth?: string;
  color: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <Link
      onClick={props.onClick}
      color={props.color}
      fontSize={"18px"}
      fontWeight={"semibold"}
      bg={props.bg}
      borderColor={props.borderColor}
      borderWidth={props.borderWidth}
      rounded={"full"}
      textAlign={"center"}
      py={"10px"}
      px={"25px"}
      w={"full"}
      _hover={{
        bg: "#5A2DA4",
        transition: "ease-in",
        boxShadow: "lg",
        color: "white",
        borderColor: "#5A2DA4",
      }}
    >
      {props.buttonText}
    </Link>
  );
};
