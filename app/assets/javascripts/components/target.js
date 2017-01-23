var Target = React.createClass({
  getInitialState: function() {
    return {display: this.props.toDisplay, item: this.props.item};
  },
  propTypes: {
    toDisplay: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      item: null
    };
  },
  render: function() {
    //if there is anything on the board, render it
    if (this.state.item !== null) {
        //create a ul to hold the cards
        return React.createElement(
          'ul',
          {className: "playing-board row small-up-6 column"},
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
        {className: "playing-board column"},
        this.state.display
    );
  }
});
