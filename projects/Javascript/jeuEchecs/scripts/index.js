import * as pieces from "./pieces.js";
import * as board from "./board.js";

  ////////////////////////////////////////////////////////
 //                     INIT                           //
////////////////////////////////////////////////////////

//const player1 = new board.Player('white'),
//    player2 = new board.Player('black');
//player1.init();
//player2.init();

const piece = [
  new pieces.Pawn('white', 3, 6),
  new pieces.Pawn('black', 4, 5),
  new pieces.Pawn('black', 3, 2)
];

piece[0].checkMooves();
piece[0].showMooves();

