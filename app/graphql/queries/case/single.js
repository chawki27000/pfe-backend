import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import DrugType from '../../schema/output/drug';

import Drug from '../../../models/drug';

export default {
    type: new GraphQLList(DrugType),
    description: 'A list of drug with projection',
    args: {
        name: {
            type: GraphQLString,
        }
    },
    resolve: (_, args) =>
        Drug.find({name: args.name})
}
