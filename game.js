import React from 'react';
import './game.css';
import Board from './board';
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = 
        {
            history:[Array(9).fill(null)],      
            step: 0,                         
        };

      }

    handClick(e){

        var step = this.state.step;

        var end = Number(step)+Number(1);
        var history = this.state.history.slice(0, end);

        var squares = history[step];
        var currentSquare = squares[e.target.value];

        if(currentSquare !== null && currentSquare !== ''){
            return;
        }

        if(caculateWinner(squares) === true){
            return;
        }

        var newSquares = squares.slice();
        newSquares[e.target.value] =  (this.state.step%2 === 0 ? 'X' : 'O'); 

        this.setState({'squares': newSquares});

        history.push(newSquares);
        this.setState({history: history});

        this.setState({'step' : Number(step) + Number(1)});

    }

    handListClick(e){
        this.setState({'step': e.target.value});
    }

    render() {        

    var list = [];
    for(var j = 0; j < this.state.history.length; j++) {
        list.push(<button key={10+j} onClick={(e)=>this.handListClick(e)} value={j} >step:{j} </button>);
    }

    var statusInfo = "Next player:" + (this.state.step%2 === 0 ? 'X' : 'O');
    if(caculateWinner(this.state.history[this.state.step])){
        statusInfo = "Winner: " + (this.state.step%2 === 0 ? 'O' : 'X') + "!!";
    }
    
    return (
        <div className="layout">
            <div>
                <div>{statusInfo}</div>
                <Board squares={this.state.history[this.state.step]} handClick={(e)=>this.handClick(e) }/>
            </div>
            <div className="list">{list}</div>
        </div>      
    )

    }
  }
  
function caculateWinner(squares) {

    const winIndexCases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    var winState = false;
    for (var i = 0; i < winIndexCases.length; i++) {

        if (squares[winIndexCases[i][0]] === squares[winIndexCases[i][1]]
            && squares[winIndexCases[i][0]] === squares[winIndexCases[i][2]]
            && squares[winIndexCases[i][0]] != null
        ) {
            winState = true;
            break;
        }
    }

    console.log("Winner States: %s", winState);
    return winState;
}

export default Game;