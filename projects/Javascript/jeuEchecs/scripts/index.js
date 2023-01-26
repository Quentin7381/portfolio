import * as pieces from "./pieces.js";
import * as board from "./board.js";

  ////////////////////////////////////////////////////////
 //                     INIT                           //
////////////////////////////////////////////////////////

const player1 = new board.Player('white'),
    player2 = new board.Player('black');
player1.init();
player2.init();

player1.pawn[0].checkMooves();
player1.pawn[0].showMooves();
player1.pawn[0].hideMooves();

