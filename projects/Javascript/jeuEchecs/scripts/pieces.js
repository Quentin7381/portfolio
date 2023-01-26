import * as board from './board.js';

const VERBOSE = true;

class Piece{
    /**
     * creates a Piece. Use the childs objects to generate Pawn, King, etc.
     * @param {*} team the team of the piece
     * @param {*} x the x position on the board
     * @param {*} y the y position on the board
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        //parameters
        this.team = team;
        this.x = x - 1;
        this.y = y - 1;

        //dom insertion
        this.imgPath = `./imgs/${this.team}_${this.constructor.name}.png`
        this.domElt = document.createElement('img');
        this.domElt.src = this.imgPath;
        board.squares[this.x][this.y].appendChild(this.domElt);
        
        //verbose
        if(verbose){
            console.groupCollapsed('new ' + this.constructor.name + '(' + team + ', ' + x + ', ' + y + ') : ');
            console.log(this);
            console.groupEnd('new ' + this.constructor.name + '(' + team + ', ' + x + ', ' + y + ') : ');
        }
        
    }

    moove(position){

    }

    checkMooves(){

    }

    select(){

    }

    die(){

    }
}

export class Pawn extends Piece{
    /**
     * creates a Pawn on the board
     * @param {*} team the team of the piece
     * @param {*} x the x position on the board
     * @param {*} y the y position on the board
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class Bishop extends Piece{
    /**
     * creates a Bishop on the board
     * @param {*} team the team of the piece
     * @param {*} x the x position on the board
     * @param {*} y the y position on the board
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class Knight extends Piece{
    /**
     * creates a Knight on the board
     * @param {*} team the team of the piece
     * @param {*} x the x position on the board
     * @param {*} y the y position on the board
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class Rook extends Piece{
    /**
     * creates a Rock on the board
     * @param {*} team the team of the piece
     * @param {*} x the x position on the board
     * @param {*} y the y position on the board
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class King extends Piece{
    /**
     * creates a Pawn on the board
     * @param {*} team the team of the piece
     * @param {*} x the x position on the board
     * @param {*} y the y position on the board
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}

export class Queen extends Piece{
    /**
     * creates a Pawn on the board
     * @param {*} team the team of the piece
     * @param {*} x the x position on the board
     * @param {*} y the y position on the board
     * @param {*} verbose wether the function will console log or not. Default can be accessed from the const VERBOSE at begining of file
     */
    constructor(team, x, y, verbose = VERBOSE){
        super(team, x, y, verbose);
    }
}