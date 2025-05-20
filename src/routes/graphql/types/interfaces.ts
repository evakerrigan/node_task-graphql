import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export interface Context {
  prisma: PrismaClient;
  dataLoaders: DataLoaders;
}

export interface MemberType {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
}

export interface User {
  id: string;
  name: string;
  balance: number;
  posts?: Post[];
  profile?: Profile;
  userSubscribedTo?: SubscriberOnAuthor[];
  subscribedToUser?: SubscriberOnAuthor[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
}

export interface SubscriberOnAuthor {
  subscriberId: string;
  authorId: string;
}

export interface DataLoaders {
  userLoader: DataLoader<string, User | undefined, string>;
  postsLoader: DataLoader<string, Post[] | undefined, string>;
  profileLoader: DataLoader<string, Profile | undefined, string>;
  memberTypeLoader: DataLoader<string, MemberType | undefined, string>;
}
