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
  allowDrop: function(e) {
     e.preventDefault();
   },
  setCurrentCard: function(card) {
    // console.log("card passed to parent is: " + JSON.stringify(card));
    this.state.current_card = card;
    this.setState(this.state);
  },
  startDrag: function(e) {
    // console.log("STARTING DRAG ");
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData("text/html", e.currentTarget);
    e.dataTransfer.setData('card', JSON.stringify({value: e.currentTarget.innerHTML}));
    // console.log(e.dataTransfer.getData('card'));
  },
  removeChild: function() {
    if (this.state.current_card !== null) {
      for (var i = 0; i < this.state.card_array.length; i++) {
          if (this.state.card_array[i].value == this.state.current_card.value) {
            // console.log("removing index: " + i + " with value: " + this.state.card_array[i].value);
            this.state.card_array.splice(i, 1);
          }
        }
        this.current_card = null;
        //set the state, which re-renders the hand with the correct cards in it
        this.setState(this.state);
        // console.log("FINAL HAND: " + JSON.stringify(this.state.card_array));
    }
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
  render: function() {
    // console.log(JSON.stringify(this.state));
    // if there is anything in the hand, render the cards
    if (this.state.card_array.length > 0) {
      return React.createElement(
        'ul',
        {className: "hand row small-up-8", onDragOver: this.dragOver, onDrop: this.drop, onDragLeave: this.onDragLeaveContainer},
        this.state.card_array.map(function(cardNumber) {
          // console.log("key is: " + key);
          return React.createElement(
            Card,
            {key: cardNumber.value.toString(), value: cardNumber.value, callDragStart: this.startDrag, callbackParent: this.setCurrentCard}// // props
          );
        }, this)
      );
    }
    //if there is nothing in the hand, render some text
    return React.createElement(
      'ul',
      {className: "hand row small-up-6"},
      "the hand is empty"
    );
  }
});
