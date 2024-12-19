import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const seed = async () => {
  const password = await bcrypt.hash('admin', 10);

  const Query = await prisma.user.create({
    data: {
      id: 1,
      email: 'adm@adm.com.br',
      senha: password,
      enabled: true,
      nome: 'Master',
    },
  });

  return Query;
};

const logData = async () => {
  const response = await seed();
  console.log(response);
};

logData();
