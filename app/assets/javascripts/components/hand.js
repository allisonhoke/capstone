

var Hand = React.createClass({
  getInitialState: function() {
    return {card_array: this.props.data.cardSet.map(function(number) {
      return {value: number};
    })};
  },
  propTypes: {
    cardSet: React.PropTypes.array
  },
  // toggleOnePointer: function(value) {
  //   console.log("GOT IN HERE TOO!!" + value);
  // },
  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  render: function() {
    // if there is anything in the hand, render the cards
    if (this.state.card_array.length > 0) {
      return React.createElement(
        'ul',
        {className: "hand row small-up-6", onDragLeave: this.onDragLeave, onDragOver: this.allowDrop, onDrop: this.drop},
        this.state.card_array.map(function(cardNumber) {
          return React.createElement(
            Card,
            {key: cardNumber.value.toString(), value: cardNumber.value, name: JSON.stringify(this.state)}//, callbackParent: this.toggleOnePointer} // props
          );
        }, this)
      );
    }
    //if there is nothing in the hand, render some text
    return React.createElement(
      'ul',
      {className: "hand row small-up-6", onDragLeave: this.onDragLeave, onDragOver: this.allowDrop, onDrop: this.drop},
      "the hand is empty"
    );
  },

  allowDrop: function(e) {
    e.preventDefault();
  },
  drop: function(e) {
    e.preventDefault();
    //get the data that was transferred with the drag
    var data = JSON.parse(e.dataTransfer.getData('text'));
    console.log("Data is: " + JSON.stringify(data));
    console.log("before state: " + JSON.stringify(this.state));
    //add that data to the card array so the card is back in the hand
    this.state.card_array.push(data);
    this.setState(this.state);
    console.log("after state: " + JSON.stringify(this.state));
  },
  onDragLeave: function(e) {
    //remove the card from the hand when it is dragged out of the hand component
    console.log("DISAPPEARING " + JSON.stringify(this.state));
    console.log("INITIAL HAND: " + JSON.stringify(this.state.card_array));
    for (var i = 0; i < this.state.card_array.length; i++) {
      if (this.state.card_array[i].value == e.target.innerHTML) {
        this.state.card_array.splice(i, 1);
      }
    }
    //set the state, which re-renders the hand with the correct cards in it
    this.setState(this.state);
    console.log("FINAL HAND: " + JSON.stringify(this.state.card_array));
    // TODO: why is this firing twice?
  }
});
