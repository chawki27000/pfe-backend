import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLObjectType({
    name: 'allDoctor',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        user: {
            type: new GraphQLNonNull(GraphQLID)
        },
        speciality: {
            type: GraphQLString
        },
        service: {
            type: GraphQLString
        },
        work: {
            type: new GraphQLNonNull(GraphQLID)
        }
    }
})
