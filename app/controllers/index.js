const { Op } = require('Sequelize');
const uuidv1 = require('uuid/v1');

module.exports.whereRegistro = function whereRegistro(req){
  return { [Op.and]: [ {registroId: req.registroId } ]};
}

module.exports.fileNameTmp = function fileNameTmp(req, ext='pdf'){
  let registro = (req.registroId) ? req.registroId : '0';
  let uuid = uuidv1();
  return `_${registro}_${uuid}.${ext}`;
}
