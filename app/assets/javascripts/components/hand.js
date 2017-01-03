/*jshint esversion: 6 */

var Hand = React.createClass({
  getInitialState: function() {
    return this.props.data;
  },
  render: function() {
    // render a ul that iterates through the props number set array and creates a card for each number
    return React.createElement(
      'ul',
      {className: "hand row small-up-6"},
      this.props.data.cardSet.map((cardNumber) =>
        React.createElement(
          Card,
          {key: cardNumber.toString(), value: cardNumber}
        )
      )
    );
  }
});
