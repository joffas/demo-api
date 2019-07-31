require('dotenv-safe').load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 3000; //porta padrão
const verifyJWT = require('./lib/lib').verifyJWT;

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(path.join(__dirname, 'public')));
//console.log(__dirname);

app.use(function(req, res, next) {
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, authorization');
  if (req.method === 'OPTIONS') {
    res.status(200).send();
  } else {
    next();
  }
});

const NAME_SPACE = '/v1';
app.use(NAME_SPACE,
  require('./app/controllers/token'),
  verifyJWT,
  require('./app/controllers/report'),
  require('./app/controllers/estado'),
  require('./app/controllers/usuario'),
  require('./app/controllers/pessoa'),
  require('./app/controllers/municipio'),
  require('./app/controllers/me')
  );

// app.use(NAME_SPACE, require('./app/controllers/estado'));
// app.use(NAME_SPACE, require('./app/controllers/usuario'));
// app.use(NAME_SPACE, require('./app/controllers/pessoa'));
// app.use(NAME_SPACE, require('./app/controllers/municipio'));
// app.use(NAME_SPACE, require('./app/controllers/me'));

//app.use('/clientes', router); nao precisa no caso de estar em baixo

//inicia o servidor
app.listen(port);
console.log('API funcionando na porta: '+port);
