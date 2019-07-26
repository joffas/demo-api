'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();
const { Municipio, Estado } = require('../models');
//Rotas Municipios

rotas.get('/municipios', (req, res, next) => {
  Municipio.findAll({
    include: [{ model: Estado }],
    order: [['nome']] })
    .then(results => {
      res.status(200).send( serialize('municipio', results) );
    })
    .catch(error => {
      res.status(401).send({ error });
    });
})

rotas.get('/municipios/:id', (req, res) => {
  Municipio.findByPk(req.params.id,  { include: [{ model: Estado }] })
    .then(result => {
      res.status(200).send( serialize('municipio', result) );
    })
    .catch(error => {
      res.status(401).send({ error });
    });
})

module.exports = rotas;
