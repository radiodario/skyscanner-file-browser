var express = require('express');
var router = express.Router();


// the api will display files in the directory
// passed onto it
module.exports = function(browser) {

  router.get("/tree", function getTree(req, res, next) {
    var requestedPath = req.query.path;
    browser(requestedPath, function(err, nodes) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(nodes);
    });
  });

  return router;

};