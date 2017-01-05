var Board = React.createClass({
  getInitialState: function() {
    return {display: this.props.data.toDisplay, item_array: this.props.data.items};
  },
  propTypes: {
    toDisplay: React.PropTypes.string,
    items: React.PropTypes.array
  },
  //
  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  render: function() {
    // console.log(this.state.display);
    // console.log(this.state.item_array);
    if (this.state.item_array.length > 0) {
      return React.createElement(
        'section',
        {className: "playing-board row small-up-6", onDragOver: this.allowDrop, onDrop: this.drop},
        this.state.item_array.map(function(card) {
          return React.createElement(
            Card,
            {key: card.value.toString(), value: card.value} // props
          );
        })
      );
    }
    return React.createElement(
      'section',
      {className: "playing-board", onDragOver: this.allowDrop, onDrop: this.drop},
      this.state.display
    );
    //   this.state.display
    // );
  },
  allowDrop: function(e) {
    e.preventDefault();
  },
  drop: function(e) {
    e.preventDefault();
    var data = JSON.parse(e.dataTransfer.getData('text'));
    // console.log(data);
    // var datatwo = e.nativeEvent;
    // console.log(datatwo);
    // console.log("before state: " + JSON.stringify(this.state));
    this.state.item_array.push(data);
    this.setState(this.state);
    // console.log("after state: " + JSON.stringify(this.state));
    // console.log(e);
    // e.target.append(data);
  }
});
