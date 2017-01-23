// var placeholder = React.createElement(
//   'li',
//   {className: "placeholder"},
//   "D.Z."
// );

var placeholder = document.createElement("li");
placeholder.className = "placeholder column";

var Field = React.createClass({
  getInitialState: function() {
    return {display: this.props.toDisplay, item_array: this.props.item_array};
  },
  propTypes: {
    toDisplay: React.PropTypes.string,
    item_array: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {

    };
  },
  startDrag: function(e) {
    // console.log("STARTING DRAG ");
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData("text/html", e.currentTarget);

    var indexDragging;
    for (var i = 0; i < this.state.item_array.length; i++) {
      if (this.state.item_array[i].value == e.currentTarget.innerHTML) {
        indexDragging = i;
      }
    }
    this.state.from = indexDragging;
    this.setState(this.state);
  },
  endDrag: function(e) {
    // console.log("ENDING DRAG");
    if (e.target.parentNode.lastChild.className == "placeholder column") {
      this.state.nodePlacement = "after";
    }

    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);

    var data = this.state.item_array;

    var from = this.state.from;
    // console.log("FROM" + from);
    var to = this.state.over;
    // console.log("TO" + to);

    if(from < to) to--;
    if(this.state.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);
    this.setState({item_array: data, nodePlacement: null});
  },
  dragOver: function(e) {
    e.preventDefault();

    this.state.target = e.target;
    this.setState(this.state);

    this.dragged.style.display = "none";
    if(e.target.className == "placeholder") return;

    if(e.target.className != "placeholder column" && e.target.className != "playing-board row small-up-8 column") {
      for (var i = 0; i < this.state.item_array.length; i++) {
        if (this.state.item_array[i].value == e.target.innerHTML) {
          this.state.over = i;
          this.setState(this.state);
        }
      }
    }
    // console.log("OVER: " + this.state.over);
    if (e.target.parentNode.className == "playing-board row small-up-8 column") {
      e.target.parentNode.insertBefore(placeholder, e.target);
    }

    if (e.target.className == "playing-board row small-up-8 column") {
      e.target.appendChild(placeholder);
    }
  },
  render: function() {
    //if there is anything on the board, render it
    if (this.state.item_array.length > 0) {
        //create a ul to hold the cards
        return React.createElement(
          'ul',
          {className: "playing-board row small-up-8 column", onDragOver: this.dragOver},
          this.state.item_array.map(function(card, index) {
            //create a card for each item in the item_array
            return React.createElement(
              Card,
              {dataset: {cardIndex: index}, key: card.value.toString(), value: card.value, callDragStart: this.startDrag, callDragEnd: this.endDrag} //, onHover: this.hover
            );
          }, this) //bind the board as this
        );

    }
    //if there is nothing on the board, render the display attribute
    return React.createElement(
        'ul',
        {className: "playing-board column"},
        this.state.display
    );
  }
});
