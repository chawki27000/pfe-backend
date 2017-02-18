import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'DrugInput',
    fields: {
        category: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        format: {
            type: GraphQLString
        },
        masse: {
            type: GraphQLInt
        }
    }
});
