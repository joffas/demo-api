function getDeserializer(data) {

  return new Promise(function(resolve, reject) {
    var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
    new JSONAPIDeserializer().deserialize(data, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

function getSerializer(modelName, payload) {
  var Serializer = require(`./${modelName}`)();
  return Serializer.serialize(payload);
}



/* Com memoization
function getSerializer(modelName) {
  return function(payload) {
    var Serializer = require(`../../serializers/${modelName}`)();
    return Serializer.serialize(payload);
  }
}
*/

module.exports.deserialize = getDeserializer;
module.exports.serialize = getSerializer;

