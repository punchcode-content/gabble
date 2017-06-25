'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
