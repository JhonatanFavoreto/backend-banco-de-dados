// É no model que fazemos a conexão com o banco de dados
// Ex: SELECT * FROM bruxos; porém estamos usando o PRISMA
// Que abstrai o comando SQL

// Importar o prisma Client
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Cria a váriavel findAll e já exporto
export const findAll = async () => {
  // SELECT * FROM bruxos = findMany();
  return await prisma.buxo.findMany({
    orderBy: { nome: 'asc' }, // Ordena por nome em ordem crescente
  });
};
