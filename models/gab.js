'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    body: {
      type: DataTypes.STRING(140),
      allowNull: false,
      validate: {
        isLength: {max: 140, min: 5}
      }
    }
  }, {});

  Gab.associate = function (models) {
    Gab.belongsTo(models.User, {foreignKey: 'userId'});
    Gab.belongsToMany(models.User, {as: 'Likers', through: 'Like', foreignKey: 'gabId', otherKey: 'userId'});
  }
  return Gab;
};
