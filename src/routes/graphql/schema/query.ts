import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from '../types/memberTypes.js';
import { IContext } from '../types/interfaces.js';
import { PostType } from '../types/postType.js';
import { UserType } from '../types/userType.js';
import { ProfileType } from '../types/profileType.js';
import { UUIDType } from '../types/uuid.js';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberType: {
      type: MemberType,
      args: { id: { type: new GraphQLNonNull(MemberTypeId) } },
      resolve: async (_source: unknown, args: { id: string }, context: IContext) =>
        await context.prisma.memberType.findUnique({ where: { id: args.id } }),
    },

    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source: unknown, args: { id: string }, context: IContext) =>
        await context.prisma.post.findUnique({ where: { id: args.id } }),
    },

    user: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source: unknown, args: { id: string }, context: IContext) =>
        await context.prisma.user.findUnique({ where: { id: args.id } }),
    },

    profile: {
      type: ProfileType,
      args: { id: { type: new GraphQLNonNull(UUIDType) } },
      resolve: async (_source: unknown, args: { id: string }, context: IContext) =>
        await context.prisma.profile.findUnique({ where: { id: args.id } }),
    },
  }),
});
