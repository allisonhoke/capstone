var Message = React.createClass({
  getInitialState: function() {
    return {display: this.props.display};
  },
  propTypes: {
    display: React.PropTypes.string
  },
  // getDefaultProps: function() {
  //   return {
  //     display: "THIS IS WORKING"
  //   };
  // },
  render: function() {
    console.log("MESSAGE COMPONEMENT message(display) is : " + this.state.display);
    // conditional to render different css styles based on the display
    return React.createElement(
      'section',
      {className: "message-box"},
      this.state.display
    );
  }
});
