## Instalação (necessário ter instalado o NodeJS, Yarn e Docker Desktop no computador)

```bash
$ yarn install
```

## Start da Aplicação em Desenvolvimento Local

```bash
$ docker-compose up -d

$ yarn prisma generate

$ yarn run start:dev

$ yarn prisma studio
```

Após realizar os comandos, basta acessar a documentação do Swagger pela url http://localhost:3000/api-doc e o banco de dados pela url http://localhost:5555/

## Start da Aplicação em Desenvolvimento usando Docker Compose

```bash
$ docker-compose up -d

$ yarn prisma studio
```

Após realizar os comandos, basta acessar a documentação do Swagger pela url http://localhost:3000/api-doc e o banco de dados pela url http://localhost:5555/
