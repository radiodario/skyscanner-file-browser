/** @jsx React.DOM */
var React = require('react');

var AppView = require('./views/appView.jsx');

React.render(<AppView nodes={nodes}/>, document.getElementById('content'));