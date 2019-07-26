'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();

rotas.get('/reports', (req, res, next) => {
  res.status(200).send( serialize('report', { id: 1, nome: 'mos-2-5.pdf' }) );
})

module.exports = rotas;
