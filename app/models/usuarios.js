const Sequelize = require('sequelize');
const { Model } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {}

  Usuario.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'usuario'
  });

  return Usuario;
}
