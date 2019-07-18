var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = function() {

  return new JSONAPISerializer('pessoa', {
    attributes: ['nome', 'email', 'documento', 'municipio'],
    municipio: {
      ref: 'id',
      id: 'municipioId',
      attributes: ['nome', 'estado'],
       estado: {
        ref: 'id',
        id: 'estadoId',
        attributes: ['nome', 'sigla']
      }
      //attributes: ['nome', 'sigla']
    }
  });

};
