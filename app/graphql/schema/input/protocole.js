import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'Protocole',
    fields: {
        case: {
            type: new GraphQLNonNull(GraphQLID)
        },
        text: {
            type: GraphQLString
        }
    }
})
