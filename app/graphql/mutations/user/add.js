import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import UserType from '../../schema/input/user';

import User from '../../../models/user';

export default {
  type: GraphQLBoolean,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(UserType)
    }
  },
  async resolve (root, params, options) {
    const UserModel = new User(params.data);
    const news = await UserModel.save();

    if (!news) {
      throw new Error('Error adding new user');
    }
    return true;
  }
};
