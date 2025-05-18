import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { IContext, IUser } from './interfaces.js';
import { ProfileType } from './profileType.js';
import { PostType } from './postType.js';

export const UserType: GraphQLObjectType<IUser, IContext> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source, _args: unknown, context: IContext) =>
        await context.prisma.post.findMany({ where: { authorId: source.id } }),
    },

    profile: {
      type: ProfileType,
      resolve: async (source, _args: unknown, context: IContext) =>
        await context.prisma.profile.findUnique({ where: { userId: source.id } }),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args, context) =>
        (
          await context.prisma.subscribersOnAuthors.findMany({
            where: { subscriberId: source.id },
            select: { author: true },
          })
        ).map(({ author }) => author),
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args: unknown, context: IContext) =>
        (
          await context.prisma.subscribersOnAuthors.findMany({
            where: { authorId: source.id },
            select: { subscriber: true },
          })
        ).map(({ subscriber }) => subscriber),
    },
  }),
});
