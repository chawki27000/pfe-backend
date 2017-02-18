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
    description: 'A list of case',
    resolve: (_, args) =>
        Case.find()
}
