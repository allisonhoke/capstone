// var placeholder = React.createElement(
//   'li',
//   {className: "placeholder"},
//   "D.Z."
// );

var placeholder = document.createElement("li");
placeholder.className = "placeholder column";

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
    // console.log("BOARDcard passed to parent is: " + JSON.stringify(card));
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
      console.log("got in here leaving container");
    }
  },
  removeChild: function() {
    this.dragged.parentNode.removeChild(placeholder);
    // console.log("Current card: " + this.state.current_card.value);
    for (var i = 0; i < this.state.item_array.length; i++) {
        if (this.state.item_array[i].value == this.state.current_card.value) {
          this.state.item_array.splice(i, 1);
        }
      }
      this.current_card = null;
      //set the state, which re-renders the hand with the correct cards in it
      this.setState(this.state);
      // console.log("FINAL HAND: " + JSON.stringify(this.state.item_array));
  },
  startDrag: function(e) {
    // console.log("STARTING DRAG ");
    this.dragged = e.currentTarget;
    e.dataTransfer.effectAllowed = 'move';

    e.dataTransfer.setData("text/html", e.currentTarget);
    e.dataTransfer.setData('card', JSON.stringify({value: e.currentTarget.innerHTML}));
    // console.log(e.dataTransfer.getData('card'));

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
  endDrag: function(e) {
    console.log("ENDING DRAG");
    // if (e.target.parentNode.lastChild.className == "placeholder column") {
    //   this.state.nodePlacement = "after";
    // }
    //
    // this.dragged.style.display = "block";
    // this.dragged.parentNode.removeChild(placeholder);
    //
    // var data = this.state.item_array;
    // var from = this.state.from;
    // // console.log("FROM" + from);
    // var to = this.state.over;
    // // console.log("TO" + to);
    //
    // if(from < to) to--;
    // if(this.state.nodePlacement == "after") to++;
    // data.splice(to, 0, data.splice(from, 1)[0]);
    // this.setState({item_array: data, nodePlacement: null});
  },




    drop: function(e) {
      e.preventDefault();
      // console.log("DROPPING");
      if (e.target.parentNode.lastChild.className == "placeholder column") {
        this.state.nodePlacement = "after";
      }
      // console.log(e.target.parentNode.className);
      this.dragged.style.display = "block";
      if (e.target.parentNode.className == "playing-board row small-up-8 column") {
        e.target.parentNode.removeChild(placeholder);
      } else if (e.target.parentNode.className == "playing-area"){
        e.target.removeChild(placeholder);
      }

      var data = this.state.item_array;
      var from = this.state.from;
      // console.log("FROM" + from);
      var to = this.state.over;
      // console.log("TO" + to);

      if(from < to) to--;
      if(this.state.nodePlacement == "after") to++;

console.log(this.alreadyOnField(this.dragged.innerHTML));
      if (this.alreadyOnField(this.dragged.innerHTML)) {
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

      console.log(this.state.nodePlacement);
console.log(JSON.stringify(this.state.item_array));


      // e.preventDefault();
      // var data = JSON.parse(e.dataTransfer.getData('card'));
      // // console.log("before state: " + JSON.stringify(this.state));
      // // add the card to the item array
      // this.state.item_array.push(data);
      // //set the state, which re-renders the board component with the correct cards
      // this.setState(this.state);
      // // console.log("after state: " + JSON.stringify(this.state));
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
    console.log("RENDER " + JSON.stringify(this.state.item_array));
    //if there is anything on the board, render it
    if (this.state.item_array.length > 0) {
        //create a ul to hold the cards
        return React.createElement(
          'ul',
          {className: "playing-board row small-up-8 column", onDragOver: this.dragOver, onDragLeave: this.onDragLeaveContainer, onDrop: this.drop},
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
        {className: "playing-board column"},
        this.state.display
    );
  }
});
