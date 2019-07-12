'use strict';
const express = require('express');
const rotas = express.Router();

//rota authentication
rotas.post('/token', (req, res, next) => {
    res.status(200).send({ token: "1" });
})

module.exports = rotas;
