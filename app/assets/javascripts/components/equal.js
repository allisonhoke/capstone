var Equal = React.createClass({
  getInitialState: function() {
    return {display: this.props.toDisplay};
  },
  propTypes: {
    toDisplay: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      toDisplay: "="
    };
  },
  render: function() {
    return React.createElement(
        'ul',
        {className: "equal column"},
        this.state.display
    );
  }
});
