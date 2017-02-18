import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import ProtocoleType from '../../schema/input/protocole';

import Protocole from '../../../models/protocole';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(ProtocoleType)
    }
  },
  async resolve (root, params, options) {
    const ProtocoleModel = new Protocole(params.data);
    const news = await ProtocoleModel.save();

    if (!news) {
      throw new Error('Error adding new comment');
    }
    return true;
  }
};
