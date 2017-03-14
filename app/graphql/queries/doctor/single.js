import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import DoctorType from '../../schema/output/doctor';

import Doctor from '../../../models/doctor';


export default {
    type: new GraphQLList(DoctorType),
    description: 'A doctor by ID',
    args: {
        id: {
            type: GraphQLString,
        }
    },
    resolve: (_, args) =>
        Doctor.find({user: args.id})
}
