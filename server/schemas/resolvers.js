const { User } = require ('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { Book } = require ('../models');

const resolvers = {
    Query: {
      me: async (_parent, _args, context) => {
        if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password');
  
            return userData;
        }
        throw new AuthenticationError('You need to be logged in!');
    }
    }
  };
    
    module.exports = resolvers;