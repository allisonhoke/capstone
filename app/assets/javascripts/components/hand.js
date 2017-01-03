var Hand = React.createClass({
  getInitialState: function() {
    return this.props.data;
  },
  render: function() {
    // the hand creates 5 cards, each with an individual state and renders those
    var createItem = function(card) {
      "THIS IS A CARD";
      return React.DOM.li(
        "THIS IS A CARD"
      );
      // <li>{card.value}</li>;
    };

    return React.DOM.ul(
      className="hand",
      // {onClick: this.handleClick},
      // this.state.value
      this.state.value
      // "THIS IS A HAND" + {this.props.value.map(createItem)}
    );
    // <ul>"THIS IS A HAND" + {this.props.value.map(createItem)}</ul>;
  }
});

React.renderComponent(Hand(), mountNode);
