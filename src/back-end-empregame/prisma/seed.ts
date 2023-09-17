import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.create({
    data: {
      name: 'Thiago Terra',
      email: 'thiago.terra@gmail.com',
    },
  });

  const post2 = await prisma.user.create({
    data: {
      name: 'João Jorges',
      email: 'joao.jorges@gmail.com',
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
