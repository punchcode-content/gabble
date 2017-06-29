'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false}
  }, {});

  User.associate = function(models) {
    User.hasMany(models.Gab, {as: 'gabs', foreignKey: 'userId'});
    User.belongsToMany(models.Gab, {as: 'LikedGabs', through: 'Like', foreignKey: 'userId', otherKey: 'gabId'});
  };
  return User;
};
