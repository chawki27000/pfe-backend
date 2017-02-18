import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
    name: 'allProtocole',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        case: {
            type: new GraphQLNonNull(GraphQLID)
        },
        text: {
            type: GraphQLString
        }
    }
})
