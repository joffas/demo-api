const Sequelize = require('sequelize');
const { Model } = Sequelize;

module.exports = (sequelize, DataTypes) => {
  class Estado extends Model {
    static associate({ Municipio }) {
      Estado.hasMany(Municipio);
    }
  }

  Estado.init({
    nome: DataTypes.STRING,
    sigla: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'estado'
  });

  return Estado;
}
