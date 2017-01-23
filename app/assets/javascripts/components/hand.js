var Hand = React.createClass({
  getInitialState: function() {
    return {card_array: this.props.data.cardSet.map(function(number) {
      return {value: number};
    })};
  },
  propTypes: {
    cardSet: React.PropTypes.array
  },
  // getDefaultProps: function() {
  //   return {
  //
  //   };
  // },
  render: function() {
    // console.log(JSON.stringify(this.state));
    // if there is anything in the hand, render the cards
    if (this.state.card_array.length > 0) {
      return React.createElement(
        'ul',
        {className: "hand row small-up-8"},
        this.state.card_array.map(function(cardNumber) {
          // console.log("key is: " + key);
          return React.createElement(
            Card,
            {key: cardNumber.value.toString(), value: cardNumber.value}// // props
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
