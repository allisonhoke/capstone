var Message = React.createClass({
  getInitialState: function() {
    return {message: this.props.message};
  },
  propTypes: {
    message: React.PropTypes.string
  },
  // getDefaultProps: function() {
  //   return {
  //     message: "THIS IS WORKING"
  //   };
  // },
  render: function() {
    // console.log("THE MEssAGe message is : " + this.state.message);
    return React.createElement(
      'section',
      {className: "message-box"},
      this.state.message
    );
  }
});
