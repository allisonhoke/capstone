var Board = React.createClass({
  getInitialState: function() {
    return {display: this.props.data.toDisplay, item_array: this.props.data.items};
  },
  propTypes: {
    toDisplay: React.PropTypes.string,
    items: React.PropTypes.array
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
    console.log("after state: " + JSON.stringify(this.state));
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
  },
  handleErrors: function(response) {
    if (!response.ok) {

    }
  },
  buttonClicked: function() {
    // console.log("THE BUTTON HAS BEEN CLICKED");
    fetch("/games", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({final_board: this.state.item_array})
    })//.then(function(response) {
      // TODO: create an element that displays the error
      // if (!response.ok) {
      //   return React.createElement(
      //     'div',
      //     {className: "error-box"},
      //     response.message
      //   );
      // }
    // })
      .then(function(response) {
      console.log(response);
    });
  },
  render: function() {
    //if there is anything on the board, render it
    if (this.state.item_array.length > 0) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          {className: "playing-board row small-up-6", onDragLeave: this.onDragLeaveContainer, onDragOver: this.allowDrop, onDrop: this.drop},
          this.state.item_array.map(function(card) {
            return React.createElement(
              Card,
              {key: card.value.toString(), value: card.value, callbackParent: this.setCurrentCard}
            );
          }, this)//bind the board as this
        ),
        //render a submit button if there is at least one element on the board
        React.createElement(
          'div',
          {className: "submit-button", onClick: this.buttonClicked},
          "Submit"
          // Submit,
          // {key: cardNumber.value.toString(), value: cardNumber.value, callbackParent: this.setCurrentCard}

        )
        // TODO: render an element if there are errors
        // if (this.state.invalid_solution === true) {
        //   React.createElement(
        //     'div',
        //     {className: "error-box", onClick: this.removeErrorBox},
        //     "Solution invalid. Please try again."
        //   )
        // }
      );
    }
    //if there is nothing on the board, render the display attribute
    return React.createElement(
      'ul',
      {className: "playing-board", onDragLeave: this.onDragLeave, onDragOver: this.allowDrop, onDrop: this.drop},
      this.state.display
    );
  },
  // TODO: why does this trigger twice?
});
