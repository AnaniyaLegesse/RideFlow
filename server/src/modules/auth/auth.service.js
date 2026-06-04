import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../db/postgres.js';
import { env } from '../../config/env.js';

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
};

export const registerUser = async ({ firstName, lastName, email, password, phone }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const error = new Error('An account with this email already exists');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, env.bcryptRounds);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash,
      phone: phone || null,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
    },
  });

  const token = generateToken(user.id, user.role);

  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.isActive) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user.id, user.role);

  const { passwordHash, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};