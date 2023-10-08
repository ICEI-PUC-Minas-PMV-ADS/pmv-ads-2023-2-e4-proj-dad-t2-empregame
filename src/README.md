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

## Histórico de versões

### [1.0.0] - 08/10/2023

#### Adicionado

- Banco de dados da aplicação.
- Todos as rotas necessárias para o projeto foram criadas.
