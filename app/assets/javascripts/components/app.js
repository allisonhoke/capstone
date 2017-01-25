var App = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  },
  
  render: function() {
    // var connectDragSource = this.props.connectDragSource;
    // var isDragging = this.props.isDragging;
    //
    // return connectDragSource(
    //   React.createElement(
    //     'li',
    //     {style: {opacity: isDragging ? 0.5 : 1, cursor: 'move', fontSize: 25, fontWeight: 'bold'},
    //     "abc"
    //   );
    // )
    return React.createElement(
      'li',
      {className: "number-card col-xs-1", draggable: "true", onDragStart: this.dragStart, onMouseDown: this.setCurrentCardForParent}, //, onDragEnd: this.dragEnd
      this.state.value
    );
  }
});
