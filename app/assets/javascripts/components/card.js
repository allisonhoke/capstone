/*jshint esversion: 6 */

var Card = React.createClass({
  getInitialState: function() {
    return this.props;
  },

  render: function() {
    return React.createElement(
      'li',
      {className: "number-card column"},
      this.state.value
    );
  }
});
