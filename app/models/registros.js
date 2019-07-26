const Sequelize = require('sequelize');
const { Model } = Sequelize;

module.exports = (sequelize, DataTypes) => {

  class Registro extends Model {
    static associate({ Pessoa }) {
      Registro.hasMany(Pessoa);
    }
  }

  Registro.init({
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'registro'
  });

  return Registro;
}
