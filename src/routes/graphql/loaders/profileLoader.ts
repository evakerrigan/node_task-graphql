import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Profile } from '../types/interfaces.js';

export const profileLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const profiles: Profile[] = await prisma.profile.findMany({
      where: {
        userId: {
          in: ids as string[],
        },
      },
    });

    return ids.map((id) => profiles.find((profile) => profile.userId === id));
  });
};
