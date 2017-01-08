var Hand = React.createClass({
  getInitialState: function() {
    return {card_array: this.props.data.cardSet.map(function(number) {
      return {value: number};
    }), current_card: this.props.current_card};
  },
  propTypes: {
    cardSet: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      current_card: null
    };
  },
  removeChild: function() {
    for (var i = 0; i < this.state.card_array.length; i++) {
        if (this.state.card_array[i].value == this.state.current_card.value) {
          console.log("removing index: " + i + " with value: " + this.state.card_array[i].value);
          this.state.card_array.splice(i, 1);
        }
      }
      this.current_card = null;
      //set the state, which re-renders the hand with the correct cards in it
      this.setState(this.state);
      // console.log("FINAL HAND: " + JSON.stringify(this.state.card_array));
  },
  onDragLeaveContainer: function(e) {
    var x = e.clientX;
    var y = e.clientY;
    var top    = e.currentTarget.offsetTop;
    var bottom = top + e.currentTarget.offsetHeight;
    var left   = e.currentTarget.offsetLeft;
    var right  = left + e.currentTarget.offsetWidth;
    if (y <= top || y >= bottom || x <= left || x >= right) {
      // console.log("dragleavecontainer");
      this.removeChild();
    }
  },
  setCurrentCard: function(card) {
    // console.log("card passed to parent is: " + JSON.stringify(card));
    this.state.current_card = card;
    this.setState(this.state);
  },
  allowDrop: function(e) {
    e.preventDefault();
  },
  drop: function(e) {
    e.preventDefault();
    //get the data that was transferred with the drag
    var data = JSON.parse(e.dataTransfer.getData('card'));
    // console.log("Data is: " + JSON.stringify(data));
    // console.log("before state: " + JSON.stringify(this.state));
    //add that data to the card array so the card is back in the hand
    this.state.card_array.push(data);
    this.setState(this.state);
    // console.log("after state: " + JSON.stringify(this.state));
  },
  render: function() {
    // console.log(JSON.stringify(this.state));
    // if there is anything in the hand, render the cards
    if (this.state.card_array.length > 0) {
      return React.createElement(
        'ul',
        {className: "hand row small-up-6", onDragLeave: this.onDragLeaveContainer, onDragOver: this.allowDrop, onDrop: this.drop},
        this.state.card_array.map(function(cardNumber) {
          // console.log("key is: " + key);
          return React.createElement(
            Card,
            {key: cardNumber.value.toString(), value: cardNumber.value, callbackParent: this.setCurrentCard}// // props
          );
        }, this)
      );
    }
    //if there is nothing in the hand, render some text
    return React.createElement(
      'ul',
      {className: "hand row small-up-6", onDragOver: this.allowDrop, onDrop: this.drop},
      "the hand is empty"
    );
  }
});
