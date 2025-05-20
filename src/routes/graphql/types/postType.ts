import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Context, Post } from './interfaces.js';
import { UserType } from './userType.js';
import { UUIDType } from './uuid.js';

export const PostType: GraphQLObjectType<Post, Context> = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: new GraphQLNonNull(UserType),
      resolve: async (source: { authorId: string }, _args: unknown, context: Context) =>
        await context.dataLoaders.userLoader.load(source.authorId),
    },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});
