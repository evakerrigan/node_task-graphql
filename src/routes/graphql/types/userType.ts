import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, User } from './interfaces.js';
import { PostType } from './postType.js';
import { ProfileType } from './profileType.js';
import { UUIDType } from './uuid.js';

export const UserType: GraphQLObjectType<User, Context> = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source, _args: unknown, context: Context) =>
        await context.dataLoaders.postsLoader.load(source.id),
    },

    profile: {
      type: ProfileType,
      resolve: async (source, _args: unknown, context: Context) =>
        await context.dataLoaders.profileLoader.load(source.id),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args: unknown, context: Context) =>
        source.userSubscribedTo
          ? context.dataLoaders.userLoader.loadMany(
              source.userSubscribedTo.map((user) => user.authorId),
            )
          : null,
    },

    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args: unknown, context: Context) =>
        source.subscribedToUser
          ? context.dataLoaders.userLoader.loadMany(
              source.subscribedToUser.map((user) => user.subscriberId),
            )
          : null,
    },
  }),
});
