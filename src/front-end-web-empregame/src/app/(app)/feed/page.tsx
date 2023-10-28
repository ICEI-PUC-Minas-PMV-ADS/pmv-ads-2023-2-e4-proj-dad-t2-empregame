"use client";

import { ButtonNavigation } from "@/components/button-navigation";
import { ButtonPrimary } from "@/components/button-primary";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Image,
  Select,
  Divider,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

const Feed = () => {
  const [isLike, setIsLike] = useState<boolean>(false);

  return (
    <main>
      <Box bg={"#FBFBFB"} height={"100vh"}>
        <Container
          maxWidth={"1366px"}
          display={"flex"}
          gap={"50px"}
          justifyContent={"space-between"}
          paddingY={"60px"}
        >
          <Flex direction={"column"} width={"20%"} gap={"18px"}>
            <ButtonNavigation
              bg={"#5A2DA4"}
              buttonText={"Feed"}
              color={"white"}
              href={"/feed"}
            />
            <ButtonNavigation
              bg={"white"}
              buttonText={"Vagas que Interessei"}
              color={"#5A2DA4"}
              href={"/feed"}
              borderColor={"#5A2DA4"}
              borderWidth={"1px"}
            />
          </Flex>
          <Flex width={"60%"} direction={"column"} gap={"20px"}>
            <Flex
              direction={"column"}
              w={"full"}
              py={"25px"}
              px={"30px"}
              gap={"25px"}
              borderWidth={"1px"}
              borderColor={"#E1E1E1"}
              rounded={"13px"}
              bg={"white"}
            >
              <Flex gap={"15px"} alignItems={"center"}>
                <Image src={"./icons/icon-maleta.svg"} alt={"maleta"} />
                <Text fontSize={"20px"} fontWeight={"bold"} color={"#2E2E2E"}>
                  Vaga de Dev FrontEnd Júnior
                </Text>
              </Flex>
              <Flex gap={"8px"} alignItems={"center"}>
                <Box
                  bg={"#5A2DA4"}
                  py={"5px"}
                  px={"10px"}
                  fontSize={"14px"}
                  color={"white"}
                  fontWeight={"medium"}
                  textAlign={"center"}
                  rounded={"full"}
                >
                  Java
                </Box>
                <Box
                  bg={"#5A2DA4"}
                  py={"5px"}
                  px={"10px"}
                  fontSize={"14px"}
                  color={"white"}
                  fontWeight={"medium"}
                  textAlign={"center"}
                  rounded={"full"}
                >
                  Liderança
                </Box>
              </Flex>
              <Flex gap={"15px"}>
                <Flex gap={"15px"} direction={"column"} w={"80%"} h={"full"}>
                  <Flex gap={"5px"} direction={"column"}>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"semibold"}
                    >
                      Descrição
                    </Text>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"normal"}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
                  </Flex>
                  <Flex gap={"5px"} direction={"column"}>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"semibold"}
                    >
                      Benefícios
                    </Text>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"normal"}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Text>
                  </Flex>
                  <Flex gap={"7px"}>
                    <Image
                      src={"./icons/icon-person.svg"}
                      alt={"pessoa"}
                    ></Image>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"normal"}
                    >
                      25 pessoas interessadas
                    </Text>
                  </Flex>
                </Flex>
                <Divider
                  orientation={"vertical"}
                  w={"1px"}
                  h={"full"}
                  bg={"#E1E1E1"}
                />
                <Flex gap={"10px"} direction={"column"} w={"20%"} h={"full"}>
                  <Flex gap={"2px"} direction={"column"}>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"semibold"}
                    >
                      Empresa
                    </Text>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"normal"}
                    >
                      Google
                    </Text>
                  </Flex>
                  <Flex gap={"2px"} direction={"column"}>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"semibold"}
                    >
                      Estado
                    </Text>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"normal"}
                    >
                      Minas Gerais
                    </Text>
                  </Flex>
                  <Flex gap={"2px"} direction={"column"}>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"semibold"}
                    >
                      Cidade
                    </Text>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"normal"}
                    >
                      Belo Horizonte
                    </Text>
                  </Flex>
                  <Flex gap={"2px"} direction={"column"}>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"semibold"}
                    >
                      Salário
                    </Text>
                    <Text
                      fontSize={"14px"}
                      color={"#2E2E2E"}
                      fontWeight={"normal"}
                    >
                      R$ 19.000,00
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Button
                onClick={() => {
                  isLike ? setIsLike(false) : setIsLike(true);
                }}
                gap={"10px"}
                color={isLike ? "white" : "#6D3BBF"}
                fontSize={"18px"}
                fontWeight={"semibold"}
                bg={isLike ? "#6D3BBF" : "white"}
                borderColor={"#6D3BBF"}
                borderWidth={"2px"}
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
                <IconCoracao
                  fill={isLike ? "#FF5757" : "white"}
                  borderColor={"#6D3BBF"}
                />
                Me Interessei
              </Button>
              <Flex justifyContent={"space-between"}>
                <Text color={"#868686"} fontSize={"13px"} fontWeight={"normal"}>
                  Publicado por
                  <Link href={""} color={"#535353"} fontWeight={"medium"}>
                    Jéssica Silva
                  </Link>
                </Text>
                <Text color={"#868686"} fontSize={"13px"} fontWeight={"normal"}>
                  12/10/2023 às 15:00hrs
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex width={"20%"} direction={"column"} gap={"18px"}>
            <Text color={"#5A2DA4"} fontSize={"18px"} fontWeight={"semibold"}>
              Pesquisar Vaga
            </Text>
            <InputGroup marginBottom={"10px"}>
              <Input
                placeholder={"Digite aqui"}
                onChange={() => {}}
                py={"10px"}
                px={"25px"}
                _placeholder={{ color: "#ADADAD" }}
                color={"#2E2E2E"}
                bg={"white"}
                rounded={"full"}
                fontSize={"16px"}
                fontWeight={"medium"}
                focusBorderColor={"#5A2DA4"}
                borderColor={"#2E2E2E"}
              />
              <InputRightElement onClick={() => {}} cursor={"pointer"}>
                <Image src={"./icons/icon-lupa.svg"} alt={"lupa"}></Image>
              </InputRightElement>
            </InputGroup>
            <Text color={"#5A2DA4"} fontSize={"18px"} fontWeight={"semibold"}>
              Filtrar Vagas
            </Text>
            <InputGroup flexDirection={"column"} gap={"5px"}>
              <Text fontSize={"16px"} color={"#2E2E2E"} fontWeight={"medium"}>
                HardSkill
              </Text>
              <Select
                placeholder={"Selecionar"}
                onChange={() => {}}
                _placeholder={{ color: "#ADADAD" }}
                color={"#2E2E2E"}
                bg={"white"}
                rounded={"full"}
                fontSize={"16px"}
                fontWeight={"medium"}
                focusBorderColor={"#5A2DA4"}
                borderColor={"#2E2E2E"}
              >
                <option>Javascript</option>
              </Select>
            </InputGroup>
            <InputGroup flexDirection={"column"} gap={"5px"}>
              <Text fontSize={"16px"} color={"#2E2E2E"} fontWeight={"medium"}>
                SoftSkill
              </Text>
              <Select
                placeholder={"Selecionar"}
                onChange={() => {}}
                _placeholder={{ color: "#ADADAD" }}
                color={"#2E2E2E"}
                bg={"white"}
                rounded={"full"}
                fontSize={"16px"}
                fontWeight={"medium"}
                focusBorderColor={"#5A2DA4"}
                borderColor={"#2E2E2E"}
              >
                <option>Liderança</option>
              </Select>
            </InputGroup>
            <ButtonPrimary buttonText="Filtrar" onClick={() => {}} />
          </Flex>
        </Container>
      </Box>
    </main>
  );
};

export default Feed;

const IconCoracao = (props: { fill: string; borderColor: string }) => {
  return (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.625 4.70125L12.5 6.28202L13.3749 4.70125C13.835 3.86987 14.5064 3.17464 15.3212 2.68576C16.1276 2.20192 17.0462 1.93715 17.9861 1.91741C19.5062 1.99121 20.9368 2.65961 21.969 3.77907C23.0078 4.90579 23.5585 6.39785 23.5007 7.92929L23.5 7.94813V7.96699C23.5 9.9114 22.4628 12.0721 20.8095 14.2438C19.1743 16.3917 17.0363 18.4208 15.0573 20.0808L15.0566 20.0814C14.3406 20.6831 13.4353 21.013 12.5 21.013C11.5647 21.013 10.6593 20.6831 9.9433 20.0814L9.94262 20.0808C7.96364 18.4208 5.82559 16.3917 4.19038 14.2438C2.53714 12.0721 1.49996 9.9114 1.49996 7.96699V7.94813L1.49925 7.92929C1.44146 6.39785 1.99213 4.90579 3.03094 3.77907C4.06308 2.65961 5.49374 1.99121 7.01382 1.91741C7.95368 1.93715 8.8723 2.20192 9.6787 2.68576C10.4935 3.17464 11.1649 3.86987 11.625 4.70125Z"
        stroke={props.borderColor}
        strokeWidth="2"
        fill={props.fill}
      />
    </svg>
  );
};

const IconChat = (props: { fill: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
    >
      <g clip-path="url(#clip0_34_538)">
        <path
          d="M15.2564 2.56845C14.3062 1.7777 13.2024 1.19233 12.0148 0.849229C10.8271 0.506132 9.58123 0.412746 8.35568 0.574955C6.08848 0.869493 4.01834 2.01583 2.56562 3.78121C1.1129 5.54659 0.386482 7.79867 0.533872 10.0802C0.681263 12.3617 1.69141 14.5016 3.35921 16.0653C5.027 17.6291 7.22742 18.4996 9.51368 18.5H14.7502C15.7444 18.4988 16.6975 18.1033 17.4005 17.4003C18.1035 16.6973 18.499 15.7442 18.5002 14.75V8.98171V8.93446C18.4208 7.70854 18.0922 6.51169 17.5345 5.41712C16.9767 4.32254 16.2016 3.35322 15.2564 2.56845ZM6.50018 5.74996H9.50018C9.69909 5.74996 9.88986 5.82897 10.0305 5.96962C10.1712 6.11028 10.2502 6.30104 10.2502 6.49996C10.2502 6.69887 10.1712 6.88963 10.0305 7.03029C9.88986 7.17094 9.69909 7.24996 9.50018 7.24996H6.50018C6.30127 7.24996 6.1105 7.17094 5.96985 7.03029C5.8292 6.88963 5.75018 6.69887 5.75018 6.49996C5.75018 6.30104 5.8292 6.11028 5.96985 5.96962C6.1105 5.82897 6.30127 5.74996 6.50018 5.74996ZM12.5002 13.25H6.50018C6.30127 13.25 6.1105 13.1709 5.96985 13.0303C5.8292 12.8896 5.75018 12.6989 5.75018 12.5C5.75018 12.301 5.8292 12.1103 5.96985 11.9696C6.1105 11.829 6.30127 11.75 6.50018 11.75H12.5002C12.6991 11.75 12.8899 11.829 13.0305 11.9696C13.1712 12.1103 13.2502 12.301 13.2502 12.5C13.2502 12.6989 13.1712 12.8896 13.0305 13.0303C12.8899 13.1709 12.6991 13.25 12.5002 13.25ZM12.5002 10.25H6.50018C6.30127 10.25 6.1105 10.1709 5.96985 10.0303C5.8292 9.88963 5.75018 9.69887 5.75018 9.49996C5.75018 9.30104 5.8292 9.11028 5.96985 8.96963C6.1105 8.82897 6.30127 8.74996 6.50018 8.74996H12.5002C12.6991 8.74996 12.8899 8.82897 13.0305 8.96963C13.1712 9.11028 13.2502 9.30104 13.2502 9.49996C13.2502 9.69887 13.1712 9.88963 13.0305 10.0303C12.8899 10.1709 12.6991 10.25 12.5002 10.25Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_34_538">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0.5 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconEdit = (props: { fill: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <g clip-path="url(#clip0_38_2723)">
        <path
          d="M16 17.125V21.2375C16.6176 21.0258 17.1795 20.6777 17.6441 20.219L19.9681 17.8933C20.4273 17.4292 20.7758 16.8675 20.9875 16.25H16.875C16.6429 16.25 16.4204 16.3422 16.2563 16.5063C16.0922 16.6704 16 16.8929 16 17.125Z"
          fill="#6D3BBF"
        />
        <path
          d="M6.5255 12.5995C6.20037 12.9245 5.94246 13.3104 5.7665 13.7351C5.59054 14.1599 5.49998 14.6151 5.5 15.0748V16.25H6.67513C7.13486 16.25 7.5901 16.1594 8.01483 15.9835C8.43956 15.8075 8.82547 15.5496 9.1505 15.2245L19.0625 5.31245C19.4106 4.96436 19.6062 4.49224 19.6062 3.99995C19.6062 3.50767 19.4106 3.03555 19.0625 2.68745C18.7144 2.33936 18.2423 2.1438 17.75 2.1438C17.2577 2.1438 16.7856 2.33936 16.4375 2.68745L6.5255 12.5995Z"
          fill="#6D3BBF"
        />
        <path
          d="M21.25 4.833C21.101 5.48208 20.7737 6.07665 20.305 6.54975L10.3878 16.4626C9.90131 16.9516 9.3227 17.3393 8.68543 17.6032C8.04816 17.8671 7.36487 18.002 6.67513 18H5.5C5.03587 18 4.59075 17.8156 4.26256 17.4874C3.93437 17.1592 3.75 16.7141 3.75 16.25V15.0749C3.74808 14.3852 3.88306 13.702 4.14711 13.0648C4.41116 12.4277 4.79903 11.8493 5.28825 11.3631L15.2003 1.45025C15.6698 0.980847 16.261 0.651759 16.9074 0.5C16.896 0.5 16.8864 0.5 16.875 0.5H4.625C3.4651 0.501389 2.35311 0.962772 1.53294 1.78294C0.712772 2.60311 0.251389 3.7151 0.25 4.875L0.25 17.125C0.251389 18.2849 0.712772 19.3969 1.53294 20.2171C2.35311 21.0372 3.4651 21.4986 4.625 21.5H14.25V17.125C14.25 16.4288 14.5266 15.7611 15.0188 15.2688C15.5111 14.7766 16.1788 14.5 16.875 14.5H21.25V4.875C21.25 4.861 21.25 4.84788 21.25 4.833Z"
          fill="#6D3BBF"
        />
      </g>
      <defs>
        <clipPath id="clip0_38_2723">
          <rect
            width="21"
            height="21"
            fill="white"
            transform="translate(0.25 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

const IconDesativarVaga = (props: { fill: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="23"
      height="22"
      viewBox="0 0 23 22"
      fill="none"
    >
      <g clip-path="url(#clip0_38_2731)">
        <path
          d="M14.3426 17.482C14.8706 18.01 14.5864 18.9111 13.8531 19.0467C13.8457 19.0476 13.8384 19.0495 13.8311 19.0504C13.5359 19.1045 13.2297 19.0018 13.0171 18.7891L2.78156 8.55456C2.45065 8.22365 2.41765 7.70023 2.70548 7.33173C2.70915 7.32715 2.71281 7.32165 2.7174 7.31706C3.05748 6.88256 3.7074 6.8459 4.09698 7.2364L14.3426 17.482ZM1.23423 9.60048C1.10315 9.84981 0.994979 10.0716 0.913396 10.2495C0.696146 10.7271 0.696146 11.2743 0.913396 11.7528C0.950979 11.8362 0.999562 11.9352 1.04815 12.0351L6.47023 17.4572C7.18706 18.1741 8.08173 18.6911 9.06715 18.9266C9.14598 18.9459 9.22573 18.9633 9.3064 18.9807C9.79865 19.0871 10.1332 18.5004 9.77756 18.1447L1.23423 9.60048ZM22.4816 20.4355C22.8401 20.7939 22.8401 21.3732 22.4816 21.7316C22.3029 21.9104 22.0682 22.0002 21.8336 22.0002C21.5989 22.0002 21.3642 21.9104 21.1855 21.7316L1.01881 1.56498C0.660396 1.20656 0.660396 0.627229 1.01881 0.268813C1.37723 -0.0896042 1.95656 -0.0896042 2.31498 0.268813L6.22731 4.18115C7.91215 3.23148 9.76748 2.75023 11.7502 2.75023C17.4262 2.75023 20.6602 6.63506 22.082 8.95056C22.9785 10.4099 22.9785 12.2231 22.082 13.6824C21.5026 14.6256 20.5438 15.9493 19.1688 17.1226L22.4816 20.4355ZM8.56573 6.51956L9.8894 7.84323C10.4357 7.51965 11.0719 7.33448 11.7511 7.33448C13.7733 7.33448 15.4178 8.97898 15.4178 11.0011C15.4178 11.6804 15.2317 12.3166 14.9091 12.8629L16.2318 14.1856C16.8726 13.2864 17.2511 12.1873 17.2511 11.0011C17.2511 7.9679 14.7844 5.50115 11.7511 5.50115C10.565 5.50115 9.4659 5.87881 8.56665 6.52048L8.56573 6.51956Z"
          fill="#6D3BBF"
        />
      </g>
      <defs>
        <clipPath id="clip0_38_2731">
          <rect
            width="22"
            height="22"
            fill="white"
            transform="translate(0.75)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
