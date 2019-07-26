'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();
const { Usuario } = require('../models');

// rotas.get('/usuarios', (req, res, next) => {
//   Usuario.findByPk(req.userId)
//     .then(usuario => {
//       res.status(200).send( serialize('usuario', usuario) );
//     })
//     .catch(error => {
//       console.log('no '+error);
//       res.status(401).send({ error });
//     })
// })

rotas.get('/usuarios', (req, res, next) => {
  Usuario.findAll()
    .then(usuarios => {
      res.status(200).send( serialize('usuario', usuarios.map((usuario) => usuario.toJSON() ) ) );
    })
    .catch(error => {
      res.status(401).send({ error });
    })
})

module.exports = rotas;
