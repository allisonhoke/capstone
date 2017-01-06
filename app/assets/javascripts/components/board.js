var Board = React.createClass({
  getInitialState: function() {
    return {display: this.props.data.toDisplay, item_array: this.props.data.items};
  },
  propTypes: {
    toDisplay: React.PropTypes.string,
    items: React.PropTypes.array
  },
  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  render: function() {
    //if there is anything on the board, render it
    if (this.state.item_array.length > 0) {
      return React.createElement(
        'section',
        {className: "playing-board row small-up-6", onDragLeave: this.onDragLeave, onDragOver: this.allowDrop, onDrop: this.drop},
        this.state.item_array.map(function(card) {
          return React.createElement(
            Card,
            {key: card.value.toString(), value: card.value}
          );
        })
      );
    }
    //if there is nothing on the board, render the display attribute
    return React.createElement(
      'ul',
      {className: "playing-board", onDragLeave: this.onDragLeave, onDragOver: this.allowDrop, onDrop: this.drop},
      this.state.display
    );
  },
  allowDrop: function(e) {
    e.preventDefault();
  },
  drop: function(e) {
    e.preventDefault();
    var data = JSON.parse(e.dataTransfer.getData('text'));
    // console.log("before state: " + JSON.stringify(this.state));
    // add the card to the item array
    this.state.item_array.push(data);
    //set the state, which re-renders the board component with the correct cards
    this.setState(this.state);
    // console.log("after state: " + JSON.stringify(this.state));
  },
  onDragLeave: function(e) {
    // console.log("INITIAL BOARD: " + JSON.stringify(this.state.item_array));
    //remove the card from the board when it is dragged out of the board component
    for (var i = 0; i < this.state.item_array.length; i++) {
      if (this.state.item_array[i].value == e.target.innerHTML) {
        this.state.item_array.splice(i, 1);
      }
    }
    //set the state, which re-renders the board with the correct cards in it
    this.setState(this.state);
    // console.log("Final BOARD: " + JSON.stringify(this.state.item_array));
  }
  // TODO: why does this trigger twice?
});
