'use strict';
const express = require('express');
const rotas = express.Router();
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

//rota authentication
rotas.post('/token', (req, res, next) => {
  const {email, senha } = req.body;
  Usuario.findOne({ where: { email, senha } })
    .then(usuario => {
      const { id } = usuario;
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: "1 day" // expires in 5min
      });
      res.status(200).send({ token });
    })
    .catch(error => {
      console.log('no '+error);
      res.status(401).send({ error });
    })
})

module.exports = rotas;
