module.exports = (sequelize, DataTypes) => {
  const Pessoa = sequelize.define('Pessoa', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    documento: DataTypes.STRING,
  });

  return Pessoa;
}
