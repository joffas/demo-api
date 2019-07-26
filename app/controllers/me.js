'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();
const { Usuario } = require('../models');

rotas.get('/me', (req, res, next) => {
  Usuario.findByPk(req.usuarioId)
    .then(usuario => {
      res.status(200).send( serialize('me', usuario) );
    })
    .catch(error => {
      console.log('kkkkno '+error);
      res.status(401).send({ error });
    })
})


module.exports = rotas;
