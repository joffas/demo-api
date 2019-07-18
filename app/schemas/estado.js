var JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = function() {

  return new JSONAPISerializer('estado', {
    attributes: ['nome', 'sigla', 'municipios'],
    municipios: {
      ref: 'id',
      included: false,
      nullIfMissing: true,
      ignoreRelationshipData: true,
      relationshipLinks: {
        related: function (record, current, parent) {
          return `/v1/estados/${parent.id}/municipios`;
        }
      }
    }
  });

};
