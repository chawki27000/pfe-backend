import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

export default new GraphQLInputObjectType({
    name: 'Doctor',
    fields: {
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
