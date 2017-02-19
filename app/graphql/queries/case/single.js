import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import CaseType from '../../schema/output/case';

import Case from '../../../models/case';

export default {
    type: new GraphQLList(CaseType),
    description: 'A case by ID',
    args: {
        id: {
            type: GraphQLString,
        }
    },
    resolve: (_, args) =>
        Case.find({_id: args.id})
}
