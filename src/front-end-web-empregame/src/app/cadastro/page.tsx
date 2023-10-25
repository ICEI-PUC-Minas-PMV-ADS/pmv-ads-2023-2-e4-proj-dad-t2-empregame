"use client";

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import { Link } from "@chakra-ui/next-js";
import { InputForm } from "@/components/input-form";
import { MouseEventHandler, SVGProps, useState } from "react";
import { ButtonPrimary } from "@/components/button-primary";

const Cadastro = () => {
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [portfolio, setPortfolio] = useState<string>("");
  const [hardskill, setHardskill] = useState<string>("");
  const [softskill, setSoftskill] = useState<string>("");

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  console.log(rating);

  return (
    <main>
      <Box
        bgGradient={"linear-gradient(82deg, #7345D6 39.13%, #DA4FE2 112.59%)"}
        minH={"80vh"}
        py={"80px"}
      >
        <Container
          maxW={"1366px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          h={"full"}
        >
          <Flex direction={"column"} minW={"340px"}>
            <Heading
              fontSize={"48px"}
              fontWeight={"bold"}
              pb={"35px"}
              color={"white"}
            >
              Cadastro
            </Heading>
            <Flex direction={"column"} gap={"30px"}>
              <Text color={"white"} fontSize={"24px"} fontWeight={"semibold"}>
                Primeiro precisamos saber quem você é?
              </Text>
              <Divider />
              <Flex gap={"30px"}>
                <Flex direction={"column"} gap={"16px"}>
                  <InputForm
                    placeholder="Nome *"
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <InputForm
                    placeholder="E-mail *"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputForm
                    placeholder="Senha *"
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </Flex>
                <Flex direction={"column"} gap={"16px"}>
                  <InputForm
                    placeholder="Telefone"
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                  <InputForm
                    placeholder="GitHub"
                    onChange={(e) => setGithub(e.target.value)}
                  />
                  <InputForm
                    placeholder="Portfólio"
                    onChange={(e) => setPortfolio(e.target.value)}
                  />
                </Flex>
              </Flex>
              <Flex direction={"column"} gap={"12px"}>
                <InputForm
                  placeholder="Hardskills"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Flex
                  direction={"column"}
                  bg={"#6D3BBF"}
                  rounded={"12px"}
                  py={"12px"}
                  px={"20px"}
                  gap={"8px"}
                  maxW={"50%"}
                >
                  <Flex justifyContent={"space-between"}>
                    <Text
                      fontSize={"16px"}
                      fontWeight={"medium"}
                      color={"white"}
                    >
                      JavaScript
                    </Text>

                    <Image src="/icons/icon-close.svg" />
                  </Flex>
                  <Flex gap={"8px"}>
                    {[...Array(5)].map((star, index) => {
                      const currentRating = index + 1;
                      return (
                        <label>
                          <input
                            type="radio"
                            name="rating"
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                            style={{ display: "none", cursor: "pointer" }}
                          />
                          <IconStar
                            fill={
                              currentRating <= (hover || rating)
                                ? "#FFB800"
                                : "white"
                            }
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(0)}
                          />
                        </label>
                      );
                    })}
                  </Flex>
                </Flex>
              </Flex>

              <Box textAlign={"center"}>
                <ButtonPrimary onClick={() => {}} buttonText="Cadastrar" />
                <Link
                  href={""}
                  fontSize={"18px"}
                  color={"white"}
                  fontWeight={"semibold"}
                >
                  Já tem uma conta? Faça login
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </main>
  );
};

export default Cadastro;

const IconStar = (props: {
  fill: string;
  onMouseEnter: MouseEventHandler<SVGSVGElement>;
  onMouseLeave: MouseEventHandler<SVGSVGElement>;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      style={{ cursor: "pointer" }}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      <g clip-path="url(#clip0_27_3091)">
        <path
          d="M0.884551 8.26672L3.25788 10.0001L2.35655 12.7914C2.21089 13.2243 2.20905 13.6927 2.35129 14.1268C2.49353 14.5608 2.77225 14.9373 3.14588 15.2001C3.51312 15.4712 3.95815 15.6165 4.41465 15.6142C4.87116 15.6119 5.31471 15.4622 5.67922 15.1874L7.99988 13.4794L10.3212 15.1854C10.6878 15.455 11.1304 15.6015 11.5855 15.6037C12.0405 15.6059 12.4845 15.4638 12.8537 15.1977C13.2229 14.9317 13.4982 14.5554 13.6401 14.123C13.7819 13.6907 13.783 13.2244 13.6432 12.7914L12.7419 10.0001L15.1152 8.26672C15.4813 7.99906 15.7535 7.62255 15.8928 7.19098C16.0321 6.7594 16.0315 6.29484 15.891 5.86364C15.7505 5.43244 15.4774 5.05667 15.1106 4.78999C14.7438 4.52331 14.3021 4.37936 13.8486 4.37872H10.9332L10.0486 1.62138C9.90943 1.18736 9.63606 0.808727 9.26786 0.540094C8.89966 0.271462 8.45566 0.126709 7.99988 0.126709C7.54411 0.126709 7.1001 0.271462 6.7319 0.540094C6.36371 0.808727 6.09034 1.18736 5.95122 1.62138L5.06655 4.37872H2.15388C1.70038 4.37936 1.25868 4.52331 0.891871 4.78999C0.525063 5.05667 0.251912 5.43244 0.111432 5.86364C-0.0290475 6.29484 -0.0296693 6.7594 0.109656 7.19098C0.24898 7.62255 0.521125 7.99906 0.887218 8.26672H0.884551Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_27_3091">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
