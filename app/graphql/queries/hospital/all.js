import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import HospitalType from '../../schema/output/hospital';

import Hospital from '../../../models/hospital';

export default {
    type: new GraphQLList(HospitalType),
    description: 'A list of hospital',
    resolve: (_, args) =>
        Hospital.find()
}
