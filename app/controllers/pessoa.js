'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();
const { Pessoa, Estado, Municipio } = require('../models');
const { Op } = require('Sequelize');
const { whereRegistro } = require('./index.js');
//Rotas Pessoas

async function getPessoa(req) {
  try {
    return await Pessoa.findOne({ where: [{id: req.params.id}, whereRegistro(req)] });
  } catch(error) {
    return error;
  }
}

function getStatusNaoAutorizado(mesagem){
  const detail = mesagem ? mesagem: 'Não autorizado!';
  return { "errors": [ {"status": "403", detail } ] };
  //res.status(403).send( getStatusNaoAutorizado('nao autorizo vc!') );
}

rotas.get('/pessoas', (req, res, next) => {
  console.log('pessoas get');
  const wherePesquisa = (req.query.nome) ?
      { [Op.or]: [ {nome: { [Op.like]: `%${req.query.nome}%` }}, {email:  { [Op.like]: `%${req.query.nome}%` } } ] }  : null;
  req.query.nome;
  Pessoa.findAll({
    where: [ whereRegistro(req), wherePesquisa ],
    include: [ { model: Municipio, include: [{ model: Estado }] } ],
    order: [[ 'nome', 'DESC' ]] })
    .then(pessoas => {
      let resultado = serialize('pessoa', pessoas.map((pessoa) => pessoa.toJSON()) );
      res.status(200).send( resultado );
    })
    .catch(error => {
      console.log('no '+error);
      res.status(403).send({ error });
    });
})

rotas.get('/pessoas/:id', (req, res) => {
  console.log('pessoa get');
  Pessoa.findOne({
    where: [{id: req.params.id}, whereRegistro(req)],
    include: [ { model: Municipio, include: [{ model: Estado }] } ]
  })
    .then(pessoa => {
      if (pessoa){
        res.status(200).send( serialize('pessoa', pessoa.toJSON()) );
      } else {
        res.status(403).send( getStatusNaoAutorizado('Pessoa não encontrada!') );
      }
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    });
})

rotas.patch('/pessoas/:id', async (req, res) => {
  console.log('path');
  const { body: { data: { id, attributes: { nome, email, documento },
    relationships: {
      // estado: { data: { id: estadoId } },
      municipio: { data: { id: municipioId } }
  } } } } = req;
  // Nova forma de esperar a promessa com await (async na f)
  try {
    const pessoa = await Pessoa.findByPk(req.params.id );
    if (pessoa.registroId==req.registroId){
      await pessoa.update({ nome, email, documento, municipioId });
      const pessoaAtualizada = await Pessoa.findByPk(id, { include: [ { model: Municipio, include: [{ model: Estado }] } ] });
      res.status(200).send( serialize('pessoa', pessoaAtualizada.toJSON() ) );
    } else {
      res.status(403).send( getStatusNaoAutorizado() );
    }
  } catch(error) {
    console.log('no '+error);
    res.status(401).send({ error });
  }
})

rotas.post('/pessoas', async (req, res) =>{
  const { body: { data: { attributes: { nome, email, documento }, relationships: { municipio: { data: { id: municipioId } } } } } } = req;
  const registroId = req.registroId;
  try {
    const results = await Pessoa.create({nome, email, documento, municipioId, registroId},
      {
        include: [{
          model: Municipio
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
      if (pessoa.registroId==req.registroId){
        return pessoa.destroy();
      } else {
        res.status(403).send( getStatusNaoAutorizado() );
      }
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
