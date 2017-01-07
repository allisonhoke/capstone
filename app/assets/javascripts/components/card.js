var Card = React.createClass({
  getInitialState: function() {
    return {value: this.props.value, clickable: this.props.can_click};
  },
  propTypes: {
    value: React.PropTypes.number,
    can_click: React.PropTypes.bool,
    callbackParent: React.PropTypes.func
  },
  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  render: function() {
    return React.createElement(
      'li',
      {className: "number-card column", draggable: true, onDragStart: this.onDragStart, onDragEnd: this.onDragEnd, onMouseDown: this.setCurrentCardForParent},
      this.state.value
    );
  },
  setCurrentCardForParent: function() {
    console.log("Setting current card for parent");
    console.log(JSON.stringify(this.state));
    this.props.callbackParent(this.state);
  },
  onDragStart: function(e) {
    console.log(this.props);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('text', JSON.stringify(this.state));
  },
  onDragEnd: function(e) {
  //does anything need to happen here?
  }
});
