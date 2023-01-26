import * as pieces from './pieces.js';

/**
 * Change default verbose for the file. Verbose will enable console.logs
 */
const VERBOSE = true;

export class Player{
    /**
     * Use this object to do all actions a player can do in his turn
     * @param {*} color player's team, either 'white' or 'black'
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(color, verbose = VERBOSE){
        this.color = color;
        this.pawn = [];
        this.knight = [];
        this.rook = [];
        this.queen = [];
        this.king = [];
        this.bishop = [];
    }
    
    /**
     * initialise player by creating all his color's pieces
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    init(verbose = VERBOSE){
        if(verbose) console.groupCollapsed('Player(' + this.color + ').init() : ');
        const pawnLine = this.color==='white' ? 7 : 2;
        const kingLine = this.color==='white' ? 8 : 1;
        for(let a=1; a<=8; a++){
            this.pawn[a] = new pieces.Pawn(this.color, a, pawnLine);
        }

        this.rook[0] = new pieces.Rook(this.color, 1, kingLine);
        this.knight[0] = new pieces.Knight(this.color, 2, kingLine);
        this.bishop[0] = new pieces.Bishop(this.color, 3, kingLine);
        this.queen[0] = new pieces.Queen(this.color, this.color=='white' ? 4 : 5, kingLine);
        this.king[0] = new pieces.King(this.color, this.color=='white' ? 5 : 4, kingLine);
        this.bishop[0] = new pieces.Bishop(this.color, 6, kingLine);
        this.knight[0] = new pieces.Knight(this.color, 7, kingLine);
        this.rook[0] = new pieces.Rook(this.color, 8, kingLine);
        if(verbose) console.groupEnd('Player(' + this.color + ').init() : ')
    }
}

export class Square{
    constructor(x, y, verbose = VERBOSE){
        this.color = color;
        this.x = x;
        this.y = y;
        this.div = null;
        this.piece = null;
        if(verbose){
            console.groupCollapsed('new Square(' + x + ' ,' + y +') :')
        }
    }

    highlight(type){
        //can be moove, kill, or check
    }

    linkDiv(){

    }

    setPiece(piece){
        this.piece = piece;
    }
}

/**
 * transforms a num to its corresponding letter. Used to convert columns number to letters as displayed in chess games.
 * @param {*} num the number to convert
 * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
 * @returns 
 */
function numToLetter(num, verbose = VERBOSE){
    if(verbose) console.log('numToLetter(' + num + ') => ' + String.fromCharCode(num + 65));
    return String.fromCharCode(num + 65);
}

/**
 * get every square in the document. They will be used to append pieces to them
 * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
 * @returns return the squares list
 */
function getSquares(verbose = VERBOSE){
    let squares = [[],[],[],[],[],[],[],[]];
    if(verbose) console.groupCollapsed('getSquares()');
    for(let a=0; a<8; a++){
        for(let b=0;b<8;b++){
            if(verbose) squares[a][b] = document.querySelector(`.${numToLetter(a)}${b+1}`);
            console.log(squares[a][b])
        }
    }
    if(verbose) console.groupEnd('getSquares()');
    return squares;
}

/**
 * 
 */
export const board = document.querySelector('.board'),
    squares = getSquares();