var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = function() {

  return new JSONAPISerializer('pessoa', {
    attributes: ['nome', 'email', 'documento']
  });

};
