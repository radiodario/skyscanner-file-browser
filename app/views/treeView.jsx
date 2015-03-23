/** @jsx React.DOM */
var React = require('react');

var request = require('superagent');

var URL = '/api/tree'


var NodeView = React.createClass({

  getInitialState: function () {
      return {
        open: false,
        selected: false,
        children: null // haven't loaded them yet
      };
  },

  getChildren: function() {
    var that = this;
    request
      .get(URL + "?path=" + this.props.path + this.props.name + '/')
      .end(function(err, res) {
        if (err) {
          that.setState({'children' : []});
        }
        console.log('requested');
        var children = JSON.parse(res.text);
        that.setState({'children' : children});
      });
  },

  removeAllSelected: function() {
    // nodelist is not array ;_;
    var selecteds = [].slice.call(document.querySelectorAll('.selected'));
    selecteds.forEach(function(node) {
      node.classList.remove('selected');
    })
  },

  handleClick: function (argument) {
    this.removeAllSelected();
    this.setState({selected: !this.state.selected});


    if (this.props.nodeType === 'file') {
      return; // do nothing
    }

    return this.setState({open: !this.state.open});

  },

  renderOpen: function() {
    var children = this.state.children;
    var props = this.props;
    if (children === null) {
      this.getChildren();
      children = [{
        name : 'loading'
      }]
    }

    return (
        <TreeView parent={this.props.path} nodes={children}/>
      );

  },



  render: function() {

    var props = this.props;
    var children = {};

    if (this.state.open) {
      children = this.renderOpen();
    }

    var iconClasses = [props.nodeType];
    if (this.state.open) {
      iconClasses.push('open');
    }

    var labelClasses = ['label'];
    if (this.state.selected) {
      labelClasses.push('selected');
    }
    return (
      <div key={props.path}
           className={"node " + props.nodeType + ''}>
        <div className={labelClasses.join(" ")}
              onClick={this.handleClick}>
          <span className={iconClasses.join(" ")}></span>
          <span className={"filename"}>{props.name}</span>
        </div>
        {children}
      </div>
    );
  }

});


var TreeView = React.createClass({

  renderNode: function(node) {
    return <NodeView {...node} />;
  },

  render: function() {
    var nodes = this.props.nodes;
    var renderedNodes = {};
    if (nodes.length) {
      renderedNodes = nodes.map(this.renderNode);
    }
    return (
      <div
        key={this.props.parent}
        className="tree">
        {renderedNodes}
      </div>
    );

  }

});


module.exports = TreeView;