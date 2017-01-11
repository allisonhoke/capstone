var Submit = React.createClass({
  getInitialState: function() {
    return {display: this.props.display};
  },
  propTypes: {
    display: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      display: "Submit"
    };
  },
  render: function() {
    return React.createElement(
      'div',
      {className: "submit-button", onClick: this.props.callbackParent},
      this.state.display
    );
  }
});
