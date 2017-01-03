var Hand = React.createClass({
  getInitialState: function() {
    return this.props.data;
  },
  render: function() {
    // the hand creates 5 cards, each with an individual state and renders those
    var createItem = function(card) {
      return React.DOM.li(
        className="number-card",
        // card
        React.createElement(
          Card,
          {value: card}
        )
      );

      // <li>{card.value}</li>;
      // for card in this.state.value
      //     React.createElement Card, key: card.id, card: card
    };

    return React.DOM.ul(
      className="hand",
      this.props.data.value.map(createItem)
      // this.state.value
      // "THIS IS A HAND" + {this.props.value.map(createItem)}
    );
    // <ul>"THIS IS A HAND" + {this.props.value.map(createItem)}</ul>;
  }
});

React.renderComponent(Hand(), mountNode);
