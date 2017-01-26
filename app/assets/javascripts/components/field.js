var placeholder = document.createElement("li");
placeholder.className = "placeholder col-xs-1";

var Field = React.createClass({
  getInitialState: function() {
    return {display: this.props.toDisplay, item_array: this.props.item_array, nodePlacement: this.props.nodePlacement};
  },
  propTypes: {
    toDisplay: React.PropTypes.string,
    item_array: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      nodePlacement: null
    };
  },
  setCurrentCard: function(card) {
    this.state.current_card = card;
    this.setState(this.state);
  },
  onDragLeaveContainer: function(e) {
    var x = e.clientX;
    var y = e.clientY;
    var top    = e.currentTarget.offsetTop;
    var bottom = top + e.currentTarget.offsetHeight;
    var left   = e.currentTarget.offsetLeft;
    var right  = left + e.currentTarget.offsetWidth;
    if (y <= top || y >= bottom || x <= left || x >= right) {
      this.removeChild();
    }
  },
  removeChild: function() {
    this.dragged.parentNode.removeChild(placeholder);
    for (var i = 0; i < this.state.item_array.length; i++) {
      if (this.state.item_array[i].value == this.state.current_card.value) {
        this.state.item_array.splice(i, 1);
      }
    }
    this.current_card = null;
    //set the state, which re-renders the hand with the correct cards in it
    this.setState(this.state);
  },
  startDrag: function(e) {
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData("text/html", e.currentTarget);
    e.dataTransfer.setData('card', JSON.stringify({value: e.currentTarget.innerHTML}));

    var indexDragging;
    for (var i = 0; i < this.state.item_array.length; i++) {
      if (this.state.item_array[i].value == e.currentTarget.innerHTML) {
        indexDragging = i;
      }
    }
    this.state.from = indexDragging;
    this.setState(this.state);
  },
  alreadyOnField: function(value) {
    for (var i = 0; i < this.state.item_array.length; i++) {
      if (this.state.item_array[i].value == value) {
        return true;
      }
    }
    return false;
  },
  drop: function(e) {
    e.preventDefault();
    if (e.target.parentNode.lastChild.className == "placeholder col-xs-1") {
      this.state.nodePlacement = "after";
    }

    if (this.dragged) {
      this.dragged.style.display = "block";
    }
    if (e.target.parentNode.className == "playing-board col-xs-10") {
      e.target.parentNode.removeChild(placeholder);
    } else if (e.target.parentNode.className == "playing-area"){
      e.target.removeChild(placeholder);
    }

    var data = this.state.item_array;
    var from = this.state.from;
    var to = this.state.over;

    if(from < to) to--;
    if(this.state.nodePlacement == "after") to++;

    var onField = this.alreadyOnField(this.dragged.innerHTML);

    if (this.dragged && onField) {
      data.splice(to, 0, data.splice(from, 1)[0]);
      this.setState({item_array: data});
    } else {
      if (this.state.nodePlacement == "after") {
        data.splice((to + 1), 0, JSON.parse(e.dataTransfer.getData('card')));
        this.setState({item_array: data});
      } else {
        data.splice(to , 0, JSON.parse(e.dataTransfer.getData('card')));
        this.setState({item_array: data});
      }
    }
    this.setState({nodePlacement: null});
  },  
  dragOver: function(e) {
    e.preventDefault();

    this.state.target = e.target;
    this.setState(this.state);

    if (this.dragged) {
      this.dragged.style.display = "none";
    }
    if(e.target.className == "placeholder") return;

    if(e.target.className != "placeholder col-xs-1" && e.target.className != "playing-board col-xs-10") {
      for (var i = 0; i < this.state.item_array.length; i++) {
        if (this.state.item_array[i].value == e.target.innerHTML) {
          this.state.over = i;
          this.setState(this.state);
        }
      }
    }
    if (e.target.parentNode.className == "playing-board col-xs-10") {
      e.target.parentNode.insertBefore(placeholder, e.target);
    }

    if (e.target.className == "playing-board col-xs-10") {
      e.target.appendChild(placeholder);
    }
  },
  render: function() {
    //if there is anything on the board, render it
    if (this.state.item_array.length > 0) {
      //create a ul to hold the cards
      return React.createElement(
        'ul',
        {className: "playing-board col-xs-10", onDragOver: this.dragOver, onDragLeave: this.onDragLeaveContainer, onDrop: this.drop},
        this.state.item_array.map(function(card, index) {
          //create a card for each item in the item_array
          return React.createElement(
            Card,
            {key: card.value.toString(), value: card.value, callDragStart: this.startDrag, callbackParent: this.setCurrentCard} //, callDragEnd: this.endDrag
          );
        }, this) //bind the board as this
      );

    }
    //if there is nothing on the board, render the display attribute
    return React.createElement(
      'ul',
      {className: "playing-board col-xs-10"},
      this.state.display
    );
  }
});
