var Card = React.createClass({
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
      'li',
      {className: "number-card column"},
      this.state.value
    );
  }
});
