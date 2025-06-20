import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { Post } from '../types/interfaces.js';

export const postsLoader = (prisma: PrismaClient) => {
  return new DataLoader(async (ids: readonly string[]) => {
    const posts: Post[] = await prisma.post.findMany({
      where: {
        authorId: {
          in: ids as string[],
        },
      },
    });

    return ids.map((id) => posts.filter((post) => post.authorId === id));
  });
};
