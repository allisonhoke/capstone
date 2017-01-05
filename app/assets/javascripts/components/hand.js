

var Hand = React.createClass({
  getInitialState: function() {
    return {card_array: this.props.data.cardSet.map(function(number) {
      return {value: number};
    })};
  },
  propTypes: {
    cardSet: React.PropTypes.array
  },

  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  render: function() {
    console.log("THE HAND HAS: " + JSON.stringify(this.state));
    // render a ul that iterates through the props number set array and creates a card for each number
    return React.createElement(
      'ul',
      {className: "hand row small-up-6", onDragLeave: this.onDragLeave, onDragOver: this.allowDrop, onDrop: this.drop},
      this.state.card_array.map(function(cardNumber) {
        return React.createElement(
          Card,
          {key: cardNumber.value.toString(), value: cardNumber.value} // props
        );
      })
    );
  },
  allowDrop: function(e) {
    e.preventDefault();
  },
  drop: function(e) {
    e.preventDefault();
    var data = JSON.parse(e.dataTransfer.getData('text'));
    console.log(data);
    // var datatwo = e.nativeEvent;
    // console.log(datatwo);
    // console.log("before state: " + JSON.stringify(this.state));
    // this.state.item_array.push(data);
    // this.setState(this.state);
    // console.log("after state: " + JSON.stringify(this.state));
    // console.log(e);
    // e.target.append(data);
  },
  onDragLeave: function(e) {
    var data = e.dataTransfer.getData('text');
    console.log("LEAVE DATA IS: " + data);
    // console.log("The event is: " + e.dataTransfer.getData('text'));
  }
});
