var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = function() {

  return new JSONAPISerializer('usuario', {
    attributes: ['nome', 'email', 'senha']
  });

};
