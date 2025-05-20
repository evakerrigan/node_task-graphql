import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { Context, MemberType as MemberTypeInterface } from './interfaces.js';
import { ProfileType } from './profileType.js';

export const MemberType: GraphQLObjectType<MemberTypeInterface, Context> =
  new GraphQLObjectType({
    name: 'MemberType',
    fields: () => ({
      id: { type: new GraphQLNonNull(MemberTypeId) },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },

      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async (source, _args: unknown, context: Context) =>
          await context.prisma.profile.findMany({ where: { memberTypeId: source.id } }),
      },
    }),
  });

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: {
      value: 'BASIC',
    },
    BUSINESS: {
      value: 'BUSINESS',
    },
  },
});
