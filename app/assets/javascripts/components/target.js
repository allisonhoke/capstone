var Target = React.createClass({
  getInitialState: function() {
    return {display: this.props.toDisplay, item: this.props.item, moving: this.props.moving};
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
 allowDrop: function(e) {
    e.preventDefault();
  },
  drop: function(e) {
    e.preventDefault();
    console.log("TRANSFERRING:" + JSON.parse(e.dataTransfer.getData('card')));
    if (this.state.item === null) {
      var data = JSON.parse(e.dataTransfer.getData('card'))
      // var data = JSON.parse(e.dataTransfer.getData('card'));
      // console.log("TARGET before state: " + JSON.stringify(this.state));
      // add the card to the item array
      this.state.item = (data);
      //set the state, which re-renders the board component with the correct cards
      this.setState(this.state);
      // console.log("TARGET after state: " + JSON.stringify(this.state));
    }
  },
  render: function() {
    console.log(this.state);
    //if there is anything on the board, render it
    if (this.state.item !== null) {
        //create a ul to hold the cards
        return React.createElement(
          'ul',
          {className: "playing-board", onDragOver: this.allowDrop, onDrop: this.drop},
            //create a card for each item in the item_array
            React.createElement(
              Card,
              {key: this.state.item.value.toString(), value: this.state.item.value}
            )
      );
    }
    //if there is nothing on the board, render the display attribute
    return React.createElement(
        'ul',
        {className: "playing-board", onDragOver: this.allowDrop, onDrop: this.drop},
        this.state.display
    );
  }
});
