/*jshint esversion: 6 */

var Card = React.createClass({
  getInitialState: function() {
    return this.props;
  },

  render: function() {
    return React.createElement(
      'li',
      null,
      this.state.value,
      console.log("the value is: " + this.state.value)

    );
    // return React.DOM.li(
    //   null,
    //   this.state.value,
    //   console.log("the value of this card is: " + this.state.value)
    // );
  }
});
