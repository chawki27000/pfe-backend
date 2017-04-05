import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID
} from 'graphql';

const CoordType = new GraphQLObjectType({
    name: 'allCoordinates',
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
    name: 'allHospital',
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
            type: CoordType
        },
        createdAt: {
            type: GraphQLString
        }
    }
})
