'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();
const { Pessoa } = require('../models');
//Rotas Pessoas

rotas.get('/pessoas', (req, res, next) => {
  Pessoa.findAll({ order: [['nome', 'DESC']] })
    .then(pessoas => {
      let resultado = serialize('pessoa', pessoas);
      res.status(200).send( resultado );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

rotas.get('/pessoas/:id', (req, res) => {
  Pessoa.findByPk(req.params.id)
    .then(pessoa => {
      res.status(200).send( serialize('pessoa', pessoa) );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

rotas.patch('/pessoas/:id', (req, res) => {
  const { body: { data: { id, attributes: { nome, email, documento } } } } = req;
  Pessoa.findByPk(id)
    .then(pessoa => {
      return pessoa.update({nome, email, documento});
    })
    .then(pessoa => {
      res.status(200).send( serialize('pessoa', pessoa) );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

rotas.post('/pessoas', (req, res) =>{
  const { body: { data: { attributes: { nome, email, documento } } } } = req;
  Pessoa.create({nome, email, documento})
    .then(function(results){
      res.status(200).send( serialize('pessoa', results) );
    })
    .catch(function(error){
      console.log('insert error:'+error);
      res.status(401).send({ error });
    });
})

rotas.delete('/pessoas/:id', (req, res) =>{
  Pessoa.findByPk(req.params.id)
    .then(pessoa => {
      return pessoa.destroy();
    })
    .then(pessoa => {
      res.status(200).send( serialize('pessoa', pessoa) );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

module.exports = rotas;
