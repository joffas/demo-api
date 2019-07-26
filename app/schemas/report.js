var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = function() {

  return new JSONAPISerializer('report', {
    attributes: ['nome']
  });

};
