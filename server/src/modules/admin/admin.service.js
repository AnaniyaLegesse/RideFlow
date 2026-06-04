import prisma from '../../db/postgres.js';

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return users;
};

export const updateUserById = async (id, data) => {
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      isActive: true,
    },
  });
  return user;
};

export const deleteUserById = async (id) => {
  await prisma.user.delete({
    where: { id: parseInt(id) },
  });
};