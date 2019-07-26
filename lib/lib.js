const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const { Usuario, Acesso, Registro } = require('../app/models');


function getConnection(){
  return mysql.createConnection({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'demo_ember'
  });
}

module.exports.serializeError = (detail='Não autorizado!', status=403) => {
  return { "errors": [ { status, detail } ] };
}

module.exports.verifyJWT = (req, res, next) => {
  let [ , token] = req.headers['authorization'].split(' ');// para o ember assim
  if (!token) return res.status(401).send({ message: 'No token provided.' });

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(401).send({ message: 'Failed to authenticate token.' });
    // se tudo estiver ok, salva no request para uso posterior
    Acesso.findOne( { where: { usuarioId: decoded.id } }, {
      include: [ { model: Registro } ]
    })
      .then(item => {
        req.acessoId = item.id;
        req.usuarioId = item.usuarioId;
        req.registroId = item.registroId;
        next();
      })
      .catch(error => {
        res.status(401).send( { error:"error", message: "message" } );
      });
  });
}

//query com callback
module.exports.execSQLQuery = function(sqlQry, callback){
  const connection = getConnection();

  connection.query(sqlQry, function(){
    connection.end();
    callback(...arguments);
  });
}

//Query com promessa
module.exports.execSQLQueryPromise = function(sqlQry){
  const connection = getConnection();

  return new Promise(function(resolve, reject){
    connection.query(sqlQry, function(error, result){
      connection.end();//feito aqui pois pode ficar com varias abertas caso use varios .then()
      if(error){
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
