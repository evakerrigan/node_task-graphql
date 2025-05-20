import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context, Profile } from './interfaces.js';
import { MemberType, MemberTypeId } from './memberTypes.js';
import { UserType } from './userType.js';
import { UUIDType } from './uuid.js';

export const ProfileType: GraphQLObjectType<Profile, Context> = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: {
      type: UserType,
      resolve: async (source, _args: unknown, context: Context) =>
        await context.prisma.user.findUnique({ where: { id: source.userId } }),
    },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: {
      type: MemberType,
      resolve: async (source, _args: unknown, context: Context) =>
        await context.dataLoaders.memberTypeLoader.load(source.memberTypeId),
    },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
  }),
});
