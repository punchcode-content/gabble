'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    body: {
      type: DataTypes.STRING(140),
      allowNull: false
    }
  }, {});

  Gab.associate = function (models) {
    Gab.belongsTo(models.User, {foreignKey: 'userId'});
  }
  return Gab;
};
