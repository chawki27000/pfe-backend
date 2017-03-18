import {
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import UserType from '../../schema/input/user';
import UserTypeOut from '../../schema/output/user';

import User from '../../../models/user';

export default {
  type: UserTypeOut,
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
    return UserModel;
  }
};
