var fs = require('fs');
var path = require('path');

module.exports = function(directory) {
  var basePath = path.resolve(directory);

  // traverse
  function makeNode(absolute, relative, name) {
    var node = fs.statSync(path.join(absolute, name));
    return {
      path: relative,
      name: name,
      nodeType: (node.isDirectory()) ? "directory" : "file"
    };
  }

  return function processLevel(requestedPath, callback) {
    var absPath = path.resolve(basePath, '.'+requestedPath);
    fs.readdir(absPath, function(err, list) {
      if (err) {
        return callback(err);
      }
      var nodes = list.map(function(name) {
        return makeNode(absPath, requestedPath, name);
      });
      setTimeout(function() {
        callback(null, nodes);
      }, 500 + (500*Math.random() | 0));
    });
  };

};