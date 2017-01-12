var Button = React.createClass({
  getInitialState: function() {
    return {display: this.props.display};
  },
  propTypes: {
    display: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      display: null
    };
  },
  render: function() {
    return React.createElement(
      'div',
      {className: "button", onClick: this.props.callbackParent},
      this.state.display
    );
  }
});
