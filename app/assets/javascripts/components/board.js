var Board = React.createClass({
  getInitialState: function() {
    return this.props;
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
    return React.createElement(
      'section',
      {className: "playing-board"},
      this.props.data.toDisplay
    );
  }
});
