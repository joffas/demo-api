'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();

rotas.get('/usuarios', (req, res, next) => {
    res.status(200).send( serialize('usuario', {id: 1, nome: "JOnathan", documento: "01894869966", email: "jonathan.seibel@gmaiol.com"} ) );
})


module.exports = rotas;
