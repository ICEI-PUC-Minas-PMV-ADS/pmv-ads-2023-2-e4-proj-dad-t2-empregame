import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  useState,
} from "react";

export const InputPassword = (props: {
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
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
        type={show ? "text" : "password"}
        value={props.value}
      />
      <InputRightElement width="3.5rem">
        <Button
          h="1.75rem"
          size="sm"
          onClick={handleClick}
          rounded={"full"}
          bg={"none"}
          _hover={{ bg: "none" }}
        >
          <IconOlhoSenha fill={show ? "#7345D6" : "#C4B5D2"} />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

const IconOlhoSenha = (props: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
  >
    <path
      d="M18.8583 8.38575C18.1632 6.94575 15.4375 2.25 9.50002 2.25C3.56252 2.25 0.836812 6.94575 0.141728 8.38575C0.0484213 8.57873 0.00012207 8.78849 0.00012207 9.00075C0.00012207 9.21301 0.0484213 9.42277 0.141728 9.61575C0.836812 11.0543 3.56252 15.75 9.50002 15.75C15.4375 15.75 18.1632 11.0543 18.8583 9.61425C18.9514 9.42149 18.9996 9.21199 18.9996 9C18.9996 8.78801 18.9514 8.57851 18.8583 8.38575ZM9.50002 13.5C8.56056 13.5 7.6422 13.2361 6.86106 12.7416C6.07993 12.2471 5.47111 11.5443 5.11159 10.7221C4.75208 9.89981 4.65801 8.99501 4.84129 8.12209C5.02457 7.24918 5.47696 6.44736 6.14126 5.81802C6.80556 5.18868 7.65193 4.7601 8.57334 4.58647C9.49475 4.41283 10.4498 4.50195 11.3178 4.84254C12.1857 5.18314 12.9276 5.75991 13.4495 6.49993C13.9714 7.23995 14.25 8.10998 14.25 9C14.2488 10.1931 13.7479 11.337 12.8574 12.1807C11.9669 13.0243 10.7594 13.4988 9.50002 13.5Z"
      fill={props.fill}
    />
    <path
      d="M9.50004 12C11.2489 12 12.6667 10.6569 12.6667 9C12.6667 7.34315 11.2489 6 9.50004 6C7.75114 6 6.33337 7.34315 6.33337 9C6.33337 10.6569 7.75114 12 9.50004 12Z"
      fill={props.fill}
    />
  </svg>
);
