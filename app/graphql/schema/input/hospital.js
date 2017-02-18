import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

const CoordType = new GraphQLInputObjectType({
    name: 'Coordinates',
    fields: {
        lat: {
            type: GraphQLFloat
        },
        lon: {
            type: GraphQLFloat
        }
    }
})

export default new GraphQLInputObjectType({
    name: 'Hospital',
    fields: {
        name: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        coordinates: {
            type: CoordType
        }
    }
})
