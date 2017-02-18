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
    description: 'A list of doctor',
    resolve: (_, args) =>
        Doctor.find()
}
