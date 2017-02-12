var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'alpha-project'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost:27017/alpha'
  },

  test: {
    root: rootPath,
    app: {
      name: 'expert-system-v3'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/expert-system-v3-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'expert-system-v3'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/expert-system-v3-production'
  }
};

module.exports = config[env];
