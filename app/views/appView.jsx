/** @jsx React.DOM */
var React = require('react');

var TreeView = require('./treeView.jsx');

var AppView = React.createClass({

  handleClick: function() {

  },

  render: function() {
    var nodes = this.props.nodes;
    return (
      <div>
        <TreeView parent={'/'} nodes={nodes}></TreeView>
      </div>
      )
  }

});

module.exports = AppView;

