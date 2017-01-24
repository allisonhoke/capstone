var Card = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  },
  propTypes: {
    value: React.PropTypes.string,
    // connectDragSource: PropTypes.func.isRequired,
    // isDragging: PropTypes.bool.isRequired
  },
  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  dragStart: function(e) {
    // console.log("STARTING DRAG");
    this.props.callDragStart(e);
  },
  dragEnd: function(e) {
    // console.log("ENDING DRAG");
    this.props.callDragEnd(e);
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
      {className: "number-card column", draggable: "true", onDragStart: this.dragStart, onDragEnd: this.dragEnd},
      this.state.value
    );
  }
});
