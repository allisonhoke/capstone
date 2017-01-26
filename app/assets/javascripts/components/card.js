var Card = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  },
  propTypes: {
    value: React.PropTypes.string
  },
  dragStart: function(e) {
    this.props.callDragStart(e);
  },
  setCurrentCardForParent: function() {
    this.props.callbackParent(this.state);
  },
  render: function() {
    return React.createElement(
      'li',
      {className: "number-card col-xs-1", draggable: "true", onDragStart: this.dragStart, onMouseDown: this.setCurrentCardForParent}, //, onDragEnd: this.dragEnd
      this.state.value
    );
  }
});
