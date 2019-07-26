const Sequelize = require('sequelize');
const { Model } = Sequelize;

module.exports = (sequelize, DataTypes) => {

  class Acesso extends Model {
    static associate({ Usuario, Registro }) {
      Acesso.belongsTo(Usuario);
      Acesso.belongsTo(Registro);
    }
  }

  Acesso.init({
    nome: DataTypes.STRING,
    tipoAcesso: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'acesso'
  });

  return Acesso;
}
