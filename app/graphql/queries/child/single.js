import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import ChildType from '../../schema/output/child';

import Child from '../../../models/child';

export default {
    type: new GraphQLList(ChildType),
    description: 'A child by ID',
    args: {
        id: {
            type: GraphQLString,
        }
    },
    resolve: (_, args) =>
        Child.find({_id: args.id})
}
