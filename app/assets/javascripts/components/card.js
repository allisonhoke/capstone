// require('pubsub-js');

var Card = React.createClass({
  getInitialState: function() {
    return {value: this.props.value, clickable: this.props.can_click};
  },
  propTypes: {
    value: React.PropTypes.number,
    can_click: React.PropTypes.bool,
    // callbackParent: React.PropTypes.func
  },
  // componentWillMount: function() {
  //   var token = PubSub.subscribe('start-dragging', function() {console.log("pubsub started dragging");});
  // },
  // getDefaultProps: function() {
  //   return {
  //     name: 'Mary'
  //   };
  // },
  render: function() {
    return React.createElement(
      'li',
      {className: "number-card column", draggable: true, onDragStart: this.onDragStart, onDragEnd: this.onDragEnd},
      this.state.value
    );
  },
  onDragStart: function(e) {
    console.log(this.props);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData('text', JSON.stringify(this.state));
    // PubSub.publish('start-dragging');
    // this.props.callbackParent(this.state.value);
  },
  onDragEnd: function(e) {
    // remove from and rerender the hand
    // console.log("the selected is: " + this.state.selected);
    // this.state.items.splice(this.state.selected, 1);
  },
  // toggleOnePointerAllowed: function() {
  //   console.log("toggleOnePointerAllowed called");
  //   console.log(this.state.value);
  //   this.props.callbackParent(this.state.value);
  // }
});
