import { MemberType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const memberTypes: MemberType[] = [
  { id: 'BASIC', postsLimitPerMonth: 10, discount: 2.3 },
  { id: 'BUSINESS', postsLimitPerMonth: 100, discount: 7.7 },
];

for (const memberType of memberTypes) {
  await prisma.memberType.upsert({
    where: { id: memberType.id },
    update: {
      postsLimitPerMonth: memberType.postsLimitPerMonth,
      discount: memberType.discount,
    },
    create: memberType,
  });
}

await prisma.$disconnect();
