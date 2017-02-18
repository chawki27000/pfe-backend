import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

const CoordType = new GraphQLObjectType({
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

export default new GraphQLObjectType({
    name: 'Hospital',
    fields: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        address: {
            type: GraphQLString
        },
        coordinates: {
            type: new GraphQLObjectType(CoordType)
        }
    }
})
