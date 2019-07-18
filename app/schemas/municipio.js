var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = function() {

  return new JSONAPISerializer('municipio', {
    attributes: ['nome', 'estado'],
    estado: {
      ref: 'id',
      id: 'estadoId',
      //attributes: ['nome', 'sigla']
    }
  });

};
