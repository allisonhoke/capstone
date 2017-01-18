var Field = React.createClass({
  getInitialState: function() {
    return {display: this.props.toDisplay, item_array: this.props.item_array};
  },
  propTypes: {
    toDisplay: React.PropTypes.string,
    item_array: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      current_card: null
    };
  },
  setCurrentCard: function(card) {
    // console.log("BOARDcard passed to parent is: " + JSON.stringify(card));
    this.state.current_card = card;
    this.setState(this.state);
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
  removeChild: function() {
    for (var i = 0; i < this.state.item_array.length; i++) {
        if (this.state.item_array[i].value == this.state.current_card.value) {
          this.state.item_array.splice(i, 1);
        }
      }
      this.current_card = null;
      //set the state, which re-renders the hand with the correct cards in it
      this.setState(this.state);
      // console.log("FINAL HAND: " + JSON.stringify(this.state.item_array));
  },
  allowDrop: function(e) {
    e.preventDefault();
  },
  drop: function(e) {
    e.preventDefault();
    var data = JSON.parse(e.dataTransfer.getData('card'));
    // console.log("before state: " + JSON.stringify(this.state));
    // add the card to the item array
    this.state.item_array.push(data);
    //set the state, which re-renders the board component with the correct cards
    this.setState(this.state);
    // console.log("after state: " + JSON.stringify(this.state));
  },
  render: function() {
    //if there is anything on the board, render it
    if (this.state.item_array.length > 0) {
        //create a ul to hold the cards
        return React.createElement(
          'ul',
          {className: "playing-board row small-up-8 column", onDragLeave: this.onDragLeaveContainer, onDragOver: this.allowDrop, onDrop: this.drop},
          this.state.item_array.map(function(card) {
            //create a card for each item in the item_array
            return React.createElement(
              Card,
              {key: card.value.toString(), value: card.value, callbackParent: this.setCurrentCard}
            );
          }, this) //bind the board as this
        );

    }
    //if there is nothing on the board, render the display attribute
    return React.createElement(
        'ul',
        {className: "playing-board column", onDragLeave: this.onDragLeave, onDragOver: this.allowDrop, onDrop: this.drop},
        this.state.display
    );
  }
});
