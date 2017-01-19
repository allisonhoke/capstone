var Target = React.createClass({
  getInitialState: function() {
    return {display: this.props.toDisplay, item: this.props.item};
  },
  propTypes: {
    toDisplay: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      item: null,
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
    if (this.state.item.value == this.state.current_card.value) {
        this.state.item = null;
        this.state.current_card = null;
      //set the state, which re-renders the hand with the correct cards in it
      this.setState(this.state);
      // console.log("FINAL HAND: " + JSON.stringify(this.state.item_array));
    }
  },
  allowDrop: function(e) {
    e.preventDefault();
  },
  drop: function(e) {
    e.preventDefault();
    if (this.state.item === null) {
      var data = JSON.parse(e.dataTransfer.getData('card'));
      // console.log("TARGET before state: " + JSON.stringify(this.state));
      // add the card to the item array
      this.state.item = (data);
      //set the state, which re-renders the board component with the correct cards
      this.setState(this.state);
      // console.log("TARGET after state: " + JSON.stringify(this.state));
    }
  },
  render: function() {
    //if there is anything on the board, render it
    if (this.state.item !== null) {
        //create a ul to hold the cards
        return React.createElement(
          'ul',
          {className: "playing-board row small-up-6 column", onDragLeave: this.onDragLeaveContainer, onDragOver: this.allowDrop, onDrop: this.drop},
            //create a card for each item in the item_array
            React.createElement(
              Card,
              {key: this.state.item.value.toString(), value: this.state.item.value, callbackParent: this.setCurrentCard}
            )
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
