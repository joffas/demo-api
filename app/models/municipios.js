const Sequelize = require('sequelize');
const { Model } = Sequelize;

module.exports = (sequelize, DataTypes) => {

  class Municipio extends Model {
    static associate({ Estado }) {
      Municipio.belongsTo(Estado);
    }
  }

  Municipio.init({
    nome: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'municipio'
  });

  return Municipio;
}
