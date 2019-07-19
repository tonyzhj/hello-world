import React from 'react';

class Board extends React.Component {

    render() {        

    var row1 = [];
    var row2 = [];
    var row3 = [];

    for(var i = 0; i < 3; i++) {
        row1.push(<button className = "cell" key={i} onClick={(e)=>this.props.handClick(e)} value={i} >{this.props.squares[i]} </button>);
    }

    for(i=3; i < 6; i++) {
        row2.push(<button className = "cell" key={i} onClick={(e)=>this.props.handClick(e)} value={i} >{this.props.squares[i]} </button>);
    }

    for(i=6; i < 9; i++) {
        row3.push(<button className = "cell" key={i} onClick={(e)=>this.props.handClick(e)} value={i} >{this.props.squares[i]} </button>);
    }
    
    return (
        <div>
            <div>{row1}</div>
            <div>{row2}</div>
            <div>{row3}</div>
        </div>      
    )

    }
  }

  export default Board;