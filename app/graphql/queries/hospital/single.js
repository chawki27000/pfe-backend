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
    description: 'A hospital by NAME',
    args: {
        id: {
            type: GraphQLString,
        }
    },
    resolve: (_, args) =>
        Hospital.find({_id: args.id})
}
