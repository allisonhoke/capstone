var Message = React.createClass({
  getInitialState: function() {
    return {display: this.props.display};
  },
  propTypes: {
    display: React.PropTypes.string
  },
  render: function() {
    return React.createElement(
      'section',
      {className: "message col-xs-9"},
      this.state.display
    );
  }
});
