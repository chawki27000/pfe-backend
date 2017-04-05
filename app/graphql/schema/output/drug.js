import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
    name: 'Drug',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
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
        },
        createdAt: {
            type: GraphQLString
        }
    }
});
