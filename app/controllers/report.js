'use strict';
const express = require('express');
const { serialize } = require('../schemas/application');
const rotas = express.Router();
const { Pessoa } = require('../models');
const { whereRegistro, fileNameTmp } = require('./index.js');
const { Op } = require('Sequelize');

rotas.get('/reports', (req, res, next) => {
  const path = "D:\\xampp\\htdocs\\";
  const fileName = fileNameTmp(req);

  var wkhtmltopdf = require('wkhtmltopdf');
  var fs = require("fs");

  const wherePesquisa = (req.query.nome) ?
      { [Op.or]: [ {nome: { [Op.like]: `%${req.query.nome}%` }}, {email:  { [Op.like]: `%${req.query.nome}%` } } ] }  : null;
  //req.query.nome;
  Pessoa.findAll({
    where: [ whereRegistro(req), wherePesquisa ]})
    .then(pessoas => {
      let resultado = '<html>';
      resultado += '<head>';
      resultado += '<head><style> table, th, td { border: 1px solid black; border-collapse: collapse; padding: 5px; text-align: left; } * {font-family: Courier New } </style></head>';
      //resultado += '<link rel="stylesheet" type="text/css" href="main.css">';
      //resultado += '<link rel="stylesheet" href="./styles/main.css">';
      resultado += '</head>';
      resultado += '<body>';

      resultado += '<h3>Listagem de Contatos</h3>';
      resultado += '<table style="width:100%">';
      resultado += '<tr><th>Nome</th><th>E-mail</th></tr>';
      resultado += pessoas.map((pessoa) => {
           return `<tr><td>${pessoa.nome}</td><td>${pessoa.email}</td></tr>`;
        }).join('');
      resultado += '</table></body></html>';

      wkhtmltopdf(resultado, {
        output: path+fileName,
        pageSize: 'letter' }, function (err, stream) {
          stream.on('finish', () => {
            res.status(200).send( serialize('report', { id: 1, nome: fileName }) );
          });
          stream.end();
          // fs.exists(path+fileName, existe => {
          //   if (existe){
          //     res.status(200).send( serialize('report', { id: 1, nome: fileName }) );
          //   }
          // })

        // do whatever with the stream
      });

    })
    .catch(error => {
      console.log('no '+error);
      res.status(403).send({ error });
    });
})

module.exports = rotas;

  // wkhtmltopdf(fs.readFileSync("index.html", "utf8"), {
  //     output: 'demo.pdf',
  //     pageSize: 'letter'
  // });


  // wkhtmltopdf(fs.createReadStream('relatorio.html'), {
  //   output: fileName,
  //   pageSize: 'letter'
  // });

  // var PDFDocument, doc;
  // var fs = require("fs");
  // PDFDocument = require('pdfkit');
  // doc = new PDFDocument;
  // doc.pipe(fs.createWriteStream(fileName));
  // doc.fontSize(25).text('Some text with an embedded font!', 100, 100);
  // doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);
  // doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");
  // doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();
  // doc.addPage().fillColor("blue").text('Here is a link!', 100, 100).underline(100, 100, 160, 27, {
  //   color: "#0000FF"
  // }).link(100, 100, 160, 27, 'http://google.com/');
  // doc.end();
