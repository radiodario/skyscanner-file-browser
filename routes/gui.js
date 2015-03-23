var express = require('express');

var app = express();
var router = express.Router();

require('node-jsx').install();

var React = require('react');

module.exports = function(browser) {
  router.get('/', function(req, res, next) {
    console.log('getting home');
    browser('/', function(err, nodes) {
      var AppView = require('../app/views/appView.jsx');
      var content = React.renderToString(React.createElement(AppView, {nodes: nodes}));
      res.render('index', {content: content, nodes: nodes});
      res.end();
    });
  });



  return router;
}