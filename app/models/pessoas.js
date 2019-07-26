const Sequelize = require('sequelize');
const { Model } = Sequelize;

module.exports = (sequelize, DataTypes) => {

  class Pessoa extends Model {
    static associate({ Municipio, Registro }) {
      Pessoa.belongsTo(Registro);
      Pessoa.belongsTo(Municipio);
    }
  }

  Pessoa.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    documento: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'pessoa'
  });

  return Pessoa;
}
