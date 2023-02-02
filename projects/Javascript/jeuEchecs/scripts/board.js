import * as pieces from './pieces.js';

/**
 * Change default verbose for the file. Verbose will enable console.logs
 */
const VERBOSE = true;

export class Player{
    /**
     * Use this object to do all actions a player can do in his turn
     * @param {String} color player's team, either 'white' or 'black'
     * @param {Boolean} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
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
        const pawnLine = this.color==='white' ? 6 : 1;
        const kingLine = this.color==='white' ? 7 : 0;
        for(let a=0; a<8; a++){
            this.pawn[a] = new pieces.Pawn(this.color, a, pawnLine);
        }

        this.rook[0] = new pieces.Rook(this.color, 0, kingLine);
        this.knight[0] = new pieces.Knight(this.color, 1, kingLine);
        this.bishop[0] = new pieces.Bishop(this.color, 2, kingLine);
        this.queen[0] = new pieces.Queen(this.color, this.color=='white' ? 3 : 4, kingLine);
        this.king[0] = new pieces.King(this.color, this.color=='white' ? 4 : 3, kingLine);
        this.bishop[0] = new pieces.Bishop(this.color, 5, kingLine);
        this.knight[0] = new pieces.Knight(this.color, 6, kingLine);
        this.rook[0] = new pieces.Rook(this.color, 7, kingLine);
        if(verbose) console.groupEnd('Player(' + this.color + ').init() : ')
    }
}

class Board{
    /**
     * 
     * @param {*} div the parent div of the board
     * @param {*} verbose 
     */
    constructor(div, verbose = VERBOSE){
        this.div = div;

        //filling squares
        this.squares = [[],[],[],[],[],[],[],[]];
        if(verbose) console.groupCollapsed('squares filling : ');
        for(let a=0; a<8; a++){
            if(verbose) console.groupCollapsed(a);
            for(let b=0;b<8;b++){
                if(verbose) console.groupCollapsed(b);
                this.squares[a][b] = new Square(a, b);
                if(verbose) console.groupEnd('a : ' + a + ' | b : ' + b);
            }
            if(verbose) console.groupEnd(a);
        }
        if(verbose) console.groupEnd('squares filling : ');
    }
}

class Square{
    constructor(x, y, verbose = VERBOSE){
        this.x = x;
        this.y = y;
        this.div = document.querySelector(`.${numToLetter(x)}${y+1}`);
        this.piece = null;
        if(verbose){
            console.groupCollapsed('new Square(' + x + ', ' + y +') :')
            console.log(this);
            console.groupEnd('new Square(' + x + ', ' + y +') :');
        }
    }

    /**
     * highlight the square with the given class
     * @param {String} type can be 'moove', 'attack', 'check' or 'none'. 'none' will remoove any highlight.
     */
    highlight(type, verbose = VERBOSE){
        if(type == 'none'){
            this.div.classList.remove('highlight__moove');
            this.div.classList.remove('highlight__attack');
            this.div.classList.remove('highlight__check');
        } else {
            this.div.classList.add(`highlight__${type}`)
        }
    }

    /**
     * remove a specific highlight from the square with the given class
     * @param {String} type can be 'moove', 'attack' or'check'
     * @param {Boolean} verbose
     */
    highlightRemove(type, verbose = VERBOSE){
        this.div.classList.remove(`highlight__${type}`)
    }

    linkDiv(){

    }

    setPiece(piece){
        this.piece = piece;
        this.div.appendChild(piece.elt);
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
 * 
 */
const board = new Board(document.querySelector('.board'));
export default board;