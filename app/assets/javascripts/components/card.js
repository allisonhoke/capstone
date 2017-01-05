var Card = React.createClass({
  getInitialState: function() {
    return {value: this.props.value};
  }, //{key: cardNumber.toString(), value: cardNumber}
  propTypes: {
    value: React.PropTypes.number
  },

  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  render: function() {
    return React.createElement(
      'li',
      {className: "number-card column", draggable: true, onDragStart: this.onDragStart, onDragEnd: this.onDragEnd},
      this.state.value
    );
  },
  onDragStart: function(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('text', JSON.stringify(this.state));
    var currentElement = e;
    console.log(currentElement);
    // e.dataTransfer.setData("custom_card_type", currentElement);
  },
  onDragEnd: function(e) {
    // remove from and rerender the hand
    // console.log("the selected is: " + this.state.selected);
    // this.state.items.splice(this.state.selected, 1);
  }

});
// figure out how to remove card from hand after it has left the hand component
