# Tic Tac Toe React App

This is a Tic Tac Toe game implemented as a React app with an integrated AI opponent. The AI opponent uses an API to determine the most optimal move for each turn.

## Project Overview

The project consists of the following files:

- **Square.js**: React component for rendering a square on the game board.

- **ConfigContext.js**: React Context for storing configuration settings, including the API URL.

- **Board.js**: React component for rendering the game board, handling user moves, and calling the backend API for AI moves.

- **Game.js**: React component managing the overall game state, including players, squares, turns, and game status.

- **App.js**: Main entry point for the React app, rendering the `Game` component.

## Getting Started

1. Clone the repository.

2. Install dependencies using `npm install`.

3. Start the development server with `npm start`.

4. Access the app in your browser at [http://localhost:3000](http://localhost:3000).

## How to Play

- Choose your symbol (X or O) to start the game.

- Make your move by clicking on an empty square.

- The AI opponent will respond with the most optimal move.

- The game ends when a player wins or it's a draw.

## Backend API

The AI opponent's moves are determined by a backend API deployed on [PythonAnywhere](https://anup619.pythonanywhere.com/). The API URL is configured using the `ConfigContext`.

## Deployment

The React app is deployed on Vercel and can be accessed at [https://tictactoe-ui-dusky.vercel.app/](https://tictactoe-ui-dusky.vercel.app/).
And the source code of the api can be found at [https://github.com/anup619/tictactoe_api](https://github.com/anup619/tictactoe_api)


Feel free to explore the source code and adapt it to your preferences. If you encounter any issues or have suggestions for improvement, please [open an issue](https://github.com/anup619/tictactoe_ui/issues).

Enjoy playing Tic Tac Toe!
