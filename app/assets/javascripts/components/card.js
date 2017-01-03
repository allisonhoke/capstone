// import React from 'react';
//
// class Card extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       value: null
//     };
//   }
//   render() {
//     return (
//       <button>
//         {1234}
//       </button>
//     );
//   }
// }

// TODO: adjust the card so that it only displays its value - there is no need for anything to happen when it is clicked

var Card = React.createClass({
  getInitialState: function() {
    return {value: 0};
  },
  // handleClick: function() {
  //   this.setState({value: this.state.value + 1});
  // },
  render: function() {
    return React.DOM.div(
      null,
      // {onClick: this.handleClick},
      this.state.value
    );
  }
});

// React.renderComponent(Card(), mountNode);
