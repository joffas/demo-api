'use strict';
const express = require('express');
const rotas = express.Router();
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { serializeError } = require('../../lib/lib');

//rota authentication
rotas.post('/token', (req, res, next) => {
  const {email, senha } = req.body;
  if (email && senha) {
    Usuario.findOne({ where: { email, senha } })
      .then(usuario => {
        console.log('usuario = ', usuario);
        if (usuario) {
          const { id } = usuario;
          var token = jwt.sign({ id }, process.env.SECRET, { expiresIn: "1 day" });
          res.status(200).send({ token });
        } else {
          res.status(401).send( serializeError("E-mail ou senha inválido!" , 401) );
        }
      })
      .catch(error => {
        res.status(401).send( { error:"401", message: error.message } );
      })
    } else {
      res.status(401).send( serializeError("E-mail ou senha não informado!" , 401) );
    }
})

module.exports = rotas;
