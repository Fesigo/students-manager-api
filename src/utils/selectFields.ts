import { Prisma } from '@prisma/client';

export const selectUserFields: Prisma.UserSelect = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
};
