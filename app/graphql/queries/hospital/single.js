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
        name: {
            type: GraphQLString,
        }
    },
    resolve: (_, args) =>
        Hospital.find({name: args.name})
}
