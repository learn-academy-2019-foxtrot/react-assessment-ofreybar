// ASSESSMENT 4: REACT ASSESSMENT
// As a developer, you are tasked with commenting this code.
// There are 13 sections that need comments.
// Each section is marked with // Here: for JavaScript code and {/* Here: */} for JSX code.
// Comments will describe the code on the line below the comment marks.

import React, { Component } from 'react'
import './App.css';

class App extends Component{
  render(){
    return(
      <div>
        {/* 1) Here: Board is a child class, it is being pulled into the parent class aka App so that any methods/functions used inside of Board will be displayed in the final app. */}
        <Board />
      </div>
    )
  }
}

class Board extends Component{
  constructor(){
    super()
    // 2) Here: You are defining variables in a this.state method for the class of Board. 
    this.state = {
      gameBoard: Array(9).fill(null),
      currentPlayer: "🦄",
      winner: null,
    }
  }

  gamePlay = (index) => {
    // 3) Here: Line 34 is destructuring all of those variables in the method this.state so you can easily access them anytime during the coding process.
    const { gameBoard, currentPlayer, winner } = this.state
    // 4) Here: This is an if/else statement that decides what emoji is placed based on who 'currentplayer' is. This makes the turn based gameplay possible.
    if(gameBoard[index] === null && winner === null){
      gameBoard[index] = currentPlayer
      this.setState({
        gameBoard: gameBoard,
        currentPlayer: currentPlayer === "🦄" ? "🦆" : "🦄",
      })
    }
    if(winner === null){
      // 5) Here: If null is equal to winner then it calls the winningConditions which determines if a winning condition has been met.
      this.winning()
    }
  }

  winning = () => {
    const { currentPlayer, gameBoard } = this.state
    let winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    winningConditions.map(value => {
      const [a, b, c] = value
      if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
        // 6) Here: You are setting a new state and changing it based on the if/else statement. In this specific example you are setting the winner of the game to the player who currently clicked 3 in a row, and won.
        this.setState({
          winner: currentPlayer
        })
      }
    })
  }

  render(){
    const { gameBoard, currentPlayer, winner } = this.state
    // 7) Here: You are using the map function populate each item in gameBoard with a square so when it is clicked it recieves every aspect of the child class -- square.
    let mappedGameBoard = gameBoard.map((value, index) => {
      return(
        <Square
          value={ value }
          index={ index }
          key={ index }
          {/* 8) Here: When a player clicks on a square it runs the function of gamePlay to ensure a winner/loser is declared as well as the game being played properly through everything defined in that function. */}
          gamePlay={ this.gamePlay }
        />
      )
    })
    return(
      <div>
        <h1>Tic Tac Toe</h1>

          <div className="statusDiv">
            {/* 9) Here: This div tag is displaying the current player whos turn it is. */}
            The Current Player is: { currentPlayer }
          </div>

          <div className="statusDiv">
            {/* 10) Here: This div tag displays the winner of the game. */}
            The Winner is: { winner }
          </div>

          <div id="outcomeBoard">
            {/* 11) Here: This div tag displayed the mapped out gameboard with clickable squares and the full playable game. */}
            { mappedGameBoard }
          </div>

      </div>
    )
  }
}

class Square extends Component{

  handleSquareClick = () => {
    // 12) Here: You are calling gamePlay from the parent class to handle the onClick effect when pressing on the square class.
    this.props.gamePlay(this.props.index)
  }

  render(){
    return(
      <div id="square" onClick={ this.handleSquareClick }>
        {/* 13) Here: This div tag displays the value in the square of the current player who clicked.  */}
        { this.props.value }
      </div>
    )
  }
}

export default App
