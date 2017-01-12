var Board = React.createClass({
  getInitialState: function() {
    return {display: this.props.data.toDisplay, item_array: this.props.data.items, message: this.props.message};
  },
  propTypes: {
    toDisplay: React.PropTypes.string,
    items: React.PropTypes.array,
    message: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      current_card: null,
      message: "WELCOME!"
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
  handleData: function(data) {
    if (data.cardset) {
      this.state.message = "CORRECT!";
      this.setState(this.state);
    } else {
      this.state.message = data.message;
      this.setState(this.state);
    }
  },
  buttonClicked: function() {
    var a = this;

    fetch("/games", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({final_board: this.state.item_array})
    }).then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log("JSON IS: " + JSON.stringify(myJson));
      a.handleData(myJson);
    });
  },
  newGame: function() {
    window.location.reload();
  },
  render: function() {
    //if there is anything on the board, render it
    if (this.state.item_array.length > 0) {
      return React.createElement(
        'article',
        null,
        // create a new game button
        React.createElement(
          Button,
          {display: "New Game", callbackParent: this.newGame}
        ),
        //create a message element to display win or lose
        React.createElement(
          Message,
          {key: this.state.message, display: this.state.message}
        ),
        //create a ul to hold the cards
        React.createElement(
          'ul',
          {className: "playing-board row small-up-6", onDragLeave: this.onDragLeaveContainer, onDragOver: this.allowDrop, onDrop: this.drop},
          this.state.item_array.map(function(card) {
            //create a card for each item in the item_array
            return React.createElement(
              Card,
              {key: card.value.toString(), value: card.value, callbackParent: this.setCurrentCard}
            );
          }, this) //bind the board as this
        ),
        //render a submit button if there is at least one element on the board
        React.createElement(
          Button,
          {display: "Submit", callbackParent: this.buttonClicked}
        )
      );
    }
    //if there is nothing on the board, render the display attribute
    return React.createElement(
      'article',
      null,
      React.createElement(
        Button,
        {display: "New Game", callbackParent: this.newGame}
      ),
      React.createElement(
        Message,
        {display: this.state.message}
      ),
      React.createElement(
        'ul',
        {className: "playing-board", onDragLeave: this.onDragLeave, onDragOver: this.allowDrop, onDrop: this.drop},
        this.state.display
      )
    );
  }
});
