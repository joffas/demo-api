const Sequelize = require('sequelize');
const { Model } = Sequelize;

module.exports = (sequelize, DataTypes) => {

  class Pessoa extends Model {
    static associate({ Municipio }) {
      //Pessoa.belongsTo(Estado);
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
