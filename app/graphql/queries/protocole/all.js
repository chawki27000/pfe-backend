import {
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import ProtocoleType from '../../schema/output/protocole';

import Protocole from '../../../models/protocole';

export default {
    type: new GraphQLList(ProtocoleType),
    description: 'A list of protocol',
    resolve: (_, args) =>
        Protocole.find()
}
