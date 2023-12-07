# Instruções de utilização

## Instalação do Back-end da Aplicação

O back-end da aplicação foi utilizado o framework NestJS e o ORM Prisma. Para instalar e rodar o servidor basta seguir as seguintes instruções:

- Instalação (necessário ter instalado o NodeJS, Yarn e Docker Desktop no computador)

```bash
$ yarn install
```

- Start da Aplicação em Desenvolvimento Local

```bash
$ docker-compose up -d

$ yarn prisma generate

$ yarn run start:dev

$ yarn prisma studio
```

Após realizar os comandos, basta acessar a documentação do Swagger pela url http://localhost:3000/api-doc e o banco de dados pela url http://localhost:5555/

- Start da Aplicação em Desenvolvimento usando Docker Compose

```bash
$ docker-compose up -d

$ yarn prisma studio
```

Após realizar os comandos, basta acessar a documentação do Swagger pela url http://localhost:3000/api-doc e o banco de dados pela url http://localhost:5555/

## Instalação do Front-end Web da Aplicação

- Instalação (necessário ter instalado o NodeJS e Yarn no computador)

```bash
$ yarn install
```

- Start da Aplicação em Desenvolvimento Local

```bash
$ yarn dev
```

## Instalação do Front-end Mobile da Aplicação

- Instalação (necessário ter instalado o NodeJS e Yarn no computador)

```bash
$ yarn install
```

- Start da Aplicação em Desenvolvimento Local no aplicativo Expo

```bash
$ yarn expo start
```

Depois acesso o aplicativo Expo Go e escaneie o QRCode.

- Start da Aplicação em Desenvolvimento Local no navegador

```bash
$ yarn expo start --web
```

Após realizar os comandos, basta acessar a url http://localhost:3000/

## Histórico de versões do Back-end

### [1.0.0] - 08/10/2023

#### Adicionado

- Banco de dados da aplicação.
- Todos as rotas necessárias para o projeto foram criadas.

### [1.1.0] - 29/10/2023

#### Adicionado

- Novas rotas
- Melhorias no retorno das rotas de busca de vaga e usuário

## Histórico de versões do Front-End Web

### [1.0.0] - 08/10/2023

#### Adicionado

- Todas as telas da aplicação
- Ligação com banco de dados em produção
- Esquema de autenticação completo

## Histórico de versões do Front-End Mobile

### [1.0.0] - 26/11/2023

#### Adicionado

- Todas as telas da aplicação
- Ligação com banco de dados em produção
- Esquema de autenticação completo
