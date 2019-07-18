'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();
const { Estado, Municipio } = require('../models');
//Rotas Estados

rotas.get('/estados', (req, res, next) => {
  Estado.findAll({ order: [['nome', 'DESC']] })
    .then(estados => {
      let resultado = serialize('estado', estados);
      res.status(200).send( resultado );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

rotas.get('/estados/:id', (req, res) => {
  Estado.findByPk(req.params.id)
    .then(estado => {
      res.status(200).send( serialize('estado', estado) );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

rotas.get('/estados/:id/municipios', (req, res) => {
  Municipio.findAll( { where: { estadoId: req.params.id } } )
    .then(municipios => {
      res.status(200).send( serialize('municipio', municipios) );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})


module.exports = rotas;
