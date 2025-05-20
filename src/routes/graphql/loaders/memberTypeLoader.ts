import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { MemberType } from '../types/interfaces.js';

export const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const memberTypes: MemberType[] = await prisma.memberType.findMany({
      where: {
        id: {
          in: ids as string[],
        },
      },
    });

    return ids.map((id) => memberTypes.find((memberType) => memberType.id === id));
  });
};
