"use client";

import { authToken } from "@/utils/config/authToken";
import { useAppContext } from "@/utils/hooks/useContext";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export const Header = () => {
  const {
    state: { usuario },
    dispatch: dispatchAppContext,
  } = useAppContext();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([authToken.nome]);

  const deslogar = () => {
    removeCookie(authToken.nome);
    dispatchAppContext({ payload: null, type: "SET_USUARIO" });
    router.push("/login");
  };

  return (
    <header>
      <Container maxW={"1366px"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          height={"140px"}
        >
          <Image
            src="./logo-empregame.svg"
            onClick={() => router.push("/feed")}
            cursor={"pointer"}
          />
          <Flex gap={"70px"} alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<IconPerfil />}
                rightIcon={<IconOpenSelect />}
                color={"#5A2DA4"}
                gap={"8px"}
                bg={"white"}
                _hover={{ bg: "#E3D1FF" }}
                _focus={{ bg: "#E3D1FF" }}
                _active={{ bg: "#E3D1FF" }}
              >
                {usuario?.nome}
              </MenuButton>
              <MenuList bg={"#6D3BBF"} textColor={"white"}>
                <MenuItem
                  bg={"#6D3BBF"}
                  gap={"10px"}
                  _hover={{ bg: "#4E2297" }}
                  onClick={() => router.push(`/perfil?id=${usuario?.id}`)}
                >
                  <IconPerfil2 /> Meu Perfil
                </MenuItem>
                <MenuItem
                  bg={"#6D3BBF"}
                  gap={"10px"}
                  _hover={{ bg: "#4E2297" }}
                  onClick={() => deslogar()}
                >
                  <IconDeslogar /> Deslogar
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

const IconOpenSelect = () => {
  return (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.4727 7.95993C17.345 7.83216 17.1934 7.7308 17.0265 7.66164C16.8596 7.59249 16.6808 7.55689 16.5001 7.55689C16.3195 7.55689 16.1406 7.59249 15.9737 7.66164C15.8068 7.7308 15.6552 7.83216 15.5275 7.95993L11.3237 12.1628C11.2377 12.2488 11.1212 12.297 10.9997 12.297C10.8781 12.297 10.7616 12.2488 10.6756 12.1628L6.4727 7.95993C6.21488 7.70199 5.86514 7.55703 5.50044 7.55694C5.13574 7.55685 4.78594 7.70165 4.52799 7.95947C4.27005 8.2173 4.12509 8.56703 4.125 8.93173C4.12491 9.29644 4.26971 9.64624 4.52753 9.90418L8.73137 14.108C9.02929 14.406 9.38299 14.6423 9.77226 14.8036C10.1615 14.9648 10.5788 15.0478 11.0001 15.0478C11.4215 15.0478 11.8387 14.9648 12.228 14.8036C12.6172 14.6423 12.9709 14.406 13.2689 14.108L17.4727 9.90418C17.7305 9.64633 17.8753 9.29666 17.8753 8.93206C17.8753 8.56746 17.7305 8.21778 17.4727 7.95993Z"
        fill="#2E2E2E"
      />
    </svg>
  );
};

const IconPerfil = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
    >
      <g clipPath="url(#clip0_32_369)">
        <path
          d="M11.3638 10.0938H5.63621C4.70532 10.0948 3.81289 10.4433 3.15465 11.0628C2.49642 11.6824 2.12612 12.5223 2.125 13.3984V16.7604H14.875V13.3984C14.8739 12.5223 14.5036 11.6824 13.8453 11.0628C13.1871 10.4433 12.2947 10.0948 11.3638 10.0938Z"
          fill="#5A2DA4"
        />
        <path
          d="M8.5 8.76043C10.8472 8.76043 12.75 6.96957 12.75 4.76043C12.75 2.55129 10.8472 0.760433 8.5 0.760433C6.15279 0.760433 4.25 2.55129 4.25 4.76043C4.25 6.96957 6.15279 8.76043 8.5 8.76043Z"
          fill="#5A2DA4"
        />
      </g>
      <defs>
        <clipPath id="clip0_32_369">
          <rect
            width="17"
            height="16"
            fill="white"
            transform="translate(0 0.760433)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconPerfil2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
    >
      <g clipPath="url(#clip0_38_3111)">
        <path
          d="M13.125 15.5H11.25V12.375C11.25 12.0435 11.1183 11.7255 10.8839 11.4911C10.6495 11.2567 10.3315 11.125 10 11.125H5C4.66848 11.125 4.35054 11.2567 4.11612 11.4911C3.8817 11.7255 3.75 12.0435 3.75 12.375V15.5H1.875V12.375C1.87599 11.5465 2.20555 10.7522 2.79139 10.1664C3.37722 9.58055 4.1715 9.25099 5 9.25H10C10.8285 9.25099 11.6228 9.58055 12.2086 10.1664C12.7944 10.7522 13.124 11.5465 13.125 12.375V15.5Z"
          fill="white"
        />
        <path
          d="M7.5 8C6.75832 8 6.0333 7.78007 5.41661 7.36801C4.79993 6.95596 4.31928 6.37029 4.03545 5.68506C3.75162 4.99984 3.67736 4.24584 3.82206 3.51841C3.96675 2.79098 4.3239 2.1228 4.84835 1.59835C5.3728 1.0739 6.04098 0.71675 6.76841 0.572055C7.49584 0.42736 8.24984 0.501623 8.93506 0.785452C9.62029 1.06928 10.206 1.54993 10.618 2.16661C11.0301 2.7833 11.25 3.50832 11.25 4.25C11.249 5.24426 10.8536 6.19751 10.1506 6.90055C9.44751 7.6036 8.49426 7.99901 7.5 8ZM7.5 2.375C7.12916 2.375 6.76665 2.48497 6.45831 2.69099C6.14997 2.89702 5.90964 3.18986 5.76773 3.53247C5.62581 3.87508 5.58868 4.25208 5.66103 4.61579C5.73338 4.97951 5.91195 5.3136 6.17418 5.57583C6.4364 5.83805 6.77049 6.01662 7.13421 6.08897C7.49792 6.16132 7.87492 6.12419 8.21753 5.98227C8.56014 5.84036 8.85298 5.60004 9.05901 5.29169C9.26503 4.98335 9.375 4.62084 9.375 4.25C9.375 3.75272 9.17746 3.27581 8.82583 2.92417C8.4742 2.57254 7.99728 2.375 7.5 2.375Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_38_3111">
          <rect
            width="15"
            height="15"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconDeslogar = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="14"
      viewBox="0 0 13 14"
      fill="none"
    >
      <g clipPath="url(#clip0_38_3103)">
        <path
          d="M6.22917 9.16667C6.01368 9.16667 5.80702 9.25227 5.65464 9.40464C5.50227 9.55702 5.41667 9.76368 5.41667 9.97917V10.4125C5.41667 10.8004 5.26258 11.1724 4.98831 11.4466C4.71404 11.7209 4.34205 11.875 3.95417 11.875H3.0875C2.69962 11.875 2.32763 11.7209 2.05336 11.4466C1.77908 11.1724 1.625 10.8004 1.625 10.4125V3.5875C1.625 3.19962 1.77908 2.82763 2.05336 2.55336C2.32763 2.27908 2.69962 2.125 3.0875 2.125H3.95417C4.34205 2.125 4.71404 2.27908 4.98831 2.55336C5.26258 2.82763 5.41667 3.19962 5.41667 3.5875V4.02083C5.41667 4.23632 5.50227 4.44298 5.65464 4.59536C5.80702 4.74773 6.01368 4.83333 6.22917 4.83333C6.44465 4.83333 6.65132 4.74773 6.80369 4.59536C6.95606 4.44298 7.04167 4.23632 7.04167 4.02083V3.5875C7.04081 2.76891 6.71524 1.98409 6.13641 1.40526C5.55758 0.826426 4.77276 0.50086 3.95417 0.5L3.0875 0.5C2.26891 0.50086 1.48409 0.826426 0.905258 1.40526C0.326426 1.98409 0.000860318 2.76891 0 3.5875L0 10.4125C0.000860318 11.2311 0.326426 12.0159 0.905258 12.5947C1.48409 13.1736 2.26891 13.4991 3.0875 13.5H3.95417C4.77276 13.4991 5.55758 13.1736 6.13641 12.5947C6.71524 12.0159 7.04081 11.2311 7.04167 10.4125V9.97917C7.04167 9.76368 6.95606 9.55702 6.80369 9.40464C6.65132 9.25227 6.44465 9.16667 6.22917 9.16667Z"
          fill="white"
        />
        <path
          d="M12.2209 5.65937L9.73678 3.17529C9.66131 3.09986 9.57172 3.04002 9.47313 2.99921C9.37453 2.9584 9.26886 2.93741 9.16216 2.93743C9.05545 2.93746 8.94979 2.9585 8.85121 2.99936C8.75264 3.04022 8.66307 3.10009 8.58764 3.17556C8.43529 3.32798 8.34973 3.53468 8.34978 3.75019C8.3498 3.8569 8.37085 3.96256 8.4117 4.06113C8.45256 4.15971 8.51244 4.24927 8.58791 4.32471L10.4355 6.17233L3.79199 6.1875C3.5765 6.1875 3.36984 6.2731 3.21747 6.42548C3.06509 6.57785 2.97949 6.78451 2.97949 7C2.97949 7.21549 3.06509 7.42215 3.21747 7.57452C3.36984 7.7269 3.5765 7.8125 3.79199 7.8125L10.4642 7.79733L8.58628 9.67529C8.43386 9.82764 8.3482 10.0343 8.34815 10.2498C8.3481 10.4653 8.43366 10.672 8.58601 10.8244C8.73836 10.9769 8.94502 11.0625 9.16053 11.0626C9.37604 11.0626 9.58274 10.9771 9.73516 10.8247L12.2192 8.34063C12.5744 7.98495 12.774 7.50296 12.7743 7.00034C12.7746 6.49772 12.5756 6.01548 12.2209 5.65937Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_38_3103">
          <rect
            width="13"
            height="13"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
