

var Hand = React.createClass({
  getInitialState: function() {
    return this.props.data;
  },
  // propTypes: {
  //   name: React.PropTypes.string
  // },
  //
  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  render: function() {
    // render a ul that iterates through the props number set array and creates a card for each number
    return React.createElement(
      'ul',
      {className: "hand row small-up-6"},
      this.props.data.cardSet.map(function(cardNumber) {
        return React.createElement(
          Card,
          {key: cardNumber.toString(), value: cardNumber}
        );
      })
    );
  }
});
