'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();
const { Pessoa, Estado, Municipio } = require('../models');
//Rotas Pessoas

rotas.get('/pessoas', (req, res, next) => {
  Pessoa.findAll({
    include: [ { model: Municipio, include: [{ model: Estado }] } ],
    order: [[ 'nome', 'DESC' ]] })
    .then(pessoas => {
      let resultado = serialize('pessoa', pessoas.map((pessoa) => pessoa.toJSON()) );
      res.status(200).send( resultado );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

rotas.get('/pessoas/:id', (req, res) => {
  Pessoa.findByPk(req.params.id, {
    include: [ { model: Municipio, include: [{ model: Estado }] } ]
  })
    .then(pessoa => {
      res.status(200).send( serialize('pessoa', pessoa.toJSON()) );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

rotas.patch('/pessoas/:id', async (req, res) => {
  const { body: { data: { id, attributes: { nome, email, documento },
    relationships: {
      // estado: { data: { id: estadoId } },
      municipio: { data: { id: municipioId } }
  } } } } = req;
  // Nova forma de esperar a promessa com await (async na f)
  try {
    const pessoa = await Pessoa.findByPk(id);
    await pessoa.update({ nome, email, documento, municipioId });
    const pessoaAtualizada = await Pessoa.findByPk(id, { include: [ { model: Municipio, include: [{ model: Estado }] } ]
    });
    res.status(200).send( serialize('pessoa', pessoaAtualizada.toJSON() ) );
  } catch(error) {
    console.log('no '+error);
    res.status(401).send({ error });
  }
})

rotas.post('/pessoas', async (req, res) =>{
  const { body: { data: { attributes: { nome, email, documento }, relationships: { estado: { data: { id: estadoId } } } } } } = req;
  try {
    const results = await Pessoa.create({nome, email, documento, estadoId},
      {
        include: [{
          model: Estado
        }]
      });
    res.status(200).send( serialize('pessoa', results.toJSON() ) );
  } catch(error) {
    console.log('insert error:'+error);
    res.status(401).send({ error });
  }
})

rotas.delete('/pessoas/:id', (req, res) =>{
  Pessoa.findByPk(req.params.id)
    .then(pessoa => {
      return pessoa.destroy();
    })
    .then(pessoa => {
      res.status(200).send( serialize('pessoa', pessoa.toJSON() ) );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

module.exports = rotas;
