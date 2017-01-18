var Board = React.createClass({
  getInitialState: function() {
    return {message: this.props.message, items: this.props.data.items, startTime: this.props.startTime, endTime: this.props.endTime};
  },
  propTypes: {
    message: React.PropTypes.string,
    items: React.PropTypes.array,
    startTime: React.PropTypes.any,
    endTime: React.PropTypes.any
  },
  getDefaultProps: function() {
    return {
      message: "WELCOME!",
      startTime: new Date()
    };
  },
  handleData: function(data) {
    // console.log("DATA is: " + JSON.stringify(data));
    if (data.board) {
      this.state.message = "CORRECT!";
      this.setState(this.state);
    } else {
      this.state.message = data.message;
      this.setState(this.state);
    }
    console.log(this.state.message);
  },
  loggedInOrNot: function() {
    if (window.location.href == "http://localhost:3000/games") {
      return "/games";
    } else {
      var fullPath = window.location.href;
      var beg = fullPath.indexOf("users");
      var end = fullPath.indexOf("#_=_");
      return fullPath.substr((beg + 5), end);
    }
  },
  buttonClicked: function() {
    var a = this;
    var cardsOnBoard = this.refs.field.state.item_array;
    var boardTarget = this.refs.target.state.item;


    if (cardsOnBoard.length === 0) {
      this.state.message = "Oops, you must create an equation with the cards!";
      this.setState(this.state);
      return ;
    } else if (boardTarget === null) {
      this.state.message = "Please set a target card";
      this.setState(this.state);
      return ;
    }


    fetch(a.loggedInOrNot(), {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({final_board: cardsOnBoard, target: boardTarget.value, endTime: new Date(), startTime: this.state.startTime}) //add starttiem endtime
    }).then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log("JSON IS: " + JSON.stringify(myJson));
      a.handleData(myJson);
    });
  },
  newGame: function() {
    window.location.reload();
  },
  render: function() {
      return React.createElement(
        'article',
        null,
        // create a new game button
        React.createElement(
          Button,
          {display: "New Game", callbackParent: this.newGame}
        ),
        //create a message element to display win or lose
        React.createElement(
          Message,
          {key: this.state.message, display: this.state.message}
        ),
        React.createElement(
          'div',
          {className: "playing-area row small-up-2"},
        //create a ul to hold the cards
          React.createElement(
            Field,
            {ref: "field", toDisplay: "Place cards here", item_array: this.state.items}
          ),
          React.createElement(
            Target,
            {ref: "target", toDisplay: "Place the target here"}
          )
        ),
        //render a submit button if there is at least one element on the board
        React.createElement(
          Button,
          {display: "Submit", callbackParent: this.buttonClicked}
        )
      );
  }
});
