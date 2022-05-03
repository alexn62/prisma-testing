import { prisma } from '../script';
import { Request, Response } from 'express';
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.status(201);
    res.send({ users });
  } catch (error) {
    res.status(500);
    res.send({ error: 'An error occurred.' });
  }
};
