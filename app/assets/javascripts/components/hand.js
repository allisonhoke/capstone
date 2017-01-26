var Hand = React.createClass({
  getInitialState: function() {
    return {card_array: [], current_card: this.props.current_card};
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
  drop: function(e) {
    e.preventDefault();
    //get the data that was transferred with the drag
    var data = JSON.parse(e.dataTransfer.getData('card'));

    //add that data to the card array so the card is back in the hand
    this.state.card_array.push(data);
    this.setState(this.state);
    console.log("after state: " + JSON.stringify(this.state));
  },
  setCurrentCard: function(card) {
    this.state.current_card = card;
    this.setState(this.state);
  },
  startDrag: function(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData("text/html", e.currentTarget);
    e.dataTransfer.setData('card', JSON.stringify({value: e.currentTarget.innerHTML}));
  },
  removeChild: function() {
    if (this.state.current_card !== null) {
      for (var i = 0; i < this.state.card_array.length; i++) {
        if (this.state.card_array[i].value == this.state.current_card.value) {
          this.state.card_array.splice(i, 1);
        }
      }
      this.current_card = null;
      //set the state, which re-renders the hand with the correct cards in it
      this.setState(this.state);
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
      this.removeChild();
    }
  },
  render: function() {
    // if there is anything in the hand, render the cards
    if (this.state.card_array.length > 0) {
      return React.createElement(
        'ul',
        {className: "hand col-xs-8", onDragOver: this.allowDrop, onDrop: this.drop, onDragLeave: this.onDragLeaveContainer},
        " "// this.state.card_array.map(function(cardNumber) {
        //   // console.log("key is: " + key);
        //   return React.createElement(
        //     Card,
        //     {key: cardNumber.value.toString(), value: cardNumber.value, callDragStart: this.startDrag, callbackParent: this.setCurrentCard}// // props
        //   );
        // }, this)
      );
    }
    //if there is nothing in the hand, render some text
    return React.createElement(
      'ul',
      {className: "hand col-xs-8", onDragOver: this.allowDrop, onDrop: this.drop, onDragLeave: this.onDragLeaveContainer},
      "Unused cards"
    );
  }
});
